import { randomUUIDv7, type ServerWebSocket } from "bun";
import { prismaClient } from "db/client";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

export type IncomingMessage =
  | {
      type: "signup";
      data: IncomingSignUpMessage;
    }
  | {
      type: "validate";
      data: IncomingValidationMessage;
    };
interface IncomingSignUpMessage {
  ip: string;
  location: string;
  publicKey: string;
  callbackId: string;
  signedMessage: string;
}

interface IncomingValidationMessage {
  status: "Good" | "Bad";
  latency: number;
  websiteId: string;
  callbackId: string;
  signedMessage: string;
  validatorId: string;
}

const CALLBACKS: {
  [callbackId: string]: (data: IncomingMessage) => void;
} = {};

const AVAILABLE_VALIDATORS: {
  publicKey: string;
  validatorId: string;
  validator: ServerWebSocket;
}[] = [];

const LAMPORTS_CREDITS_PER_VALIDATION = 10;

Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  port: 3001,
  websocket: {
    async message(ws: ServerWebSocket, message: string) {
      const data: IncomingMessage = JSON.parse(message);
      console.log(data);
      if (data.type === "signup") {
        const isLegit = verifyMessage(
          `Signup request for ${data.data.callbackId} - ${data.data.publicKey}`,
          data.data.signedMessage,
          data.data.publicKey,
        );
        if (!isLegit) {
          ws.send(
            JSON.stringify({
              type: "signup",
              message: ` Verification failed for public key ${data.data.publicKey}`,
              success: false,
            }),
          );
        }
        await SignUpHandler(ws, data.data);
      } else if (data.type === "validate") {
        CALLBACKS[data.data.callbackId](data);
        delete CALLBACKS[data.data.callbackId];
      }
    },
    close(ws: ServerWebSocket) {
      AVAILABLE_VALIDATORS.splice(
        AVAILABLE_VALIDATORS.findIndex((v) => v.validator === ws),
        1,
      );
    },
  },
});

const verifyMessage = async (
  message: string,
  signedMessage: string,
  publicKey: string,
) => {
  try {
    const messageBytes = nacl_util.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
      messageBytes,
      new Uint8Array(JSON.parse(signedMessage)),
      new PublicKey(publicKey).toBytes(),
    );

    return result;
  } catch (e) {
    console.log("Error verifying the user's signed message", e);
    return false;
  }
};

const SignUpHandler = async (
  ws: ServerWebSocket,
  data: IncomingSignUpMessage,
) => {
  const isValidatorExists = await prismaClient.validator.findUnique({
    where: {
      publicKey: data.publicKey,
    },
  });
  if (isValidatorExists) {
    AVAILABLE_VALIDATORS.push({
      publicKey: isValidatorExists.publicKey,
      validator: ws,
      validatorId: isValidatorExists.id,
    });
    ws.send(
      JSON.stringify({
        type: "signup",
        validatorId: isValidatorExists.id,
        success: true,
      }),
    );
  }
  const newValidator = await prismaClient.validator.create({
    data: {
      ip: data.ip,
      publicKey: data.publicKey,
      location: data.location,
      pendingPayout: 0,
    },
  });

  AVAILABLE_VALIDATORS.push({
    publicKey: newValidator.publicKey,
    validator: ws,
    validatorId: newValidator.id,
  });

  ws.send(
    JSON.stringify({
      type: "signup",
      validatorId: newValidator.id,
      success: true,
    }),
  );
};

setInterval(async () => {
  const allWebsites = await prismaClient.website.findMany();
  AVAILABLE_VALIDATORS.forEach((validator) => {
    allWebsites.forEach((website) => {
      const callbackId = randomUUIDv7();
      validator.validator.send(
        JSON.stringify({
          type: "validate",
          data: {
            callbackId,
            websiteUrl: website.url,
            websiteId: website.id,
          },
        }),
      );
      CALLBACKS[callbackId] = async (data: IncomingMessage) => {
        if (data.type === "validate") {
          const { status, latency, signedMessage, validatorId, websiteId } =
            data.data;

          const verified = await verifyMessage(
            `Replying to validation request ${callbackId}`,
            validator.publicKey,
            signedMessage,
          );
          if (!verified) {
            return;
          }
          await prismaClient.$transaction(async (tx) => {
            await tx.websiteTick.create({
              data: {
                latency,
                status,
                validatorId,
                time: new Date(),
                websiteId
              },
            });

            await tx.validator.update({
              where: {
                id: validatorId,
              },
              data: {
                pendingPayout: { increment: LAMPORTS_CREDITS_PER_VALIDATION },
              },
            });
          });
        }
      };
    });
  });
}, 1000 * 60);
