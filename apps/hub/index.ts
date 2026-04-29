import { type ServerWebSocket } from "bun";
import { prismaClient } from "db/client";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

export type IncomingMessageHub =
  | {
      type: "signup";
      data: ISignUpMessageRequest;
    }
  | {
      type: "validate";
      data: IValidationRequestResponse;
    };

export interface ISignUpMessageRequest {
  ip: string;
  location: string;
  publicKey: string;
  callbackId: string;
  signedMessage: string;
}

export interface IValidationRequestResponse {
  status: "Good" | "Bad";
  latency: number;
  callbackId: string;
  signedMessage: string;
  validatorId: string;
}

const CALLBACKS: {
  [callbackId: string]: (data: IncomingMessageHub) => void;
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
      const data: IncomingMessageHub = JSON.parse(message);
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
              data: {
                callbackId: data.data.callbackId,
                validatorId: "",
              },
            }),
          );
          return;
        }
        await SignUpHandler(ws, data.data);
      } else if (data.type === "validate") {
        CALLBACKS[data.data.callbackId](data);
        delete CALLBACKS[data.data.callbackId];
      }
    },
    open(ws: ServerWebSocket) {
      console.log("a validator connected");
    },
    close(ws: ServerWebSocket) {
      AVAILABLE_VALIDATORS.splice(
        AVAILABLE_VALIDATORS.findIndex((v) => v.validator === ws),
        1,
      );
    },
  },
});

const verifyMessage = (
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
  data: ISignUpMessageRequest,
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
        data: {
          callbackId: data.callbackId,
          validatorId: isValidatorExists.id,
        },
      }),
    );
    AVAILABLE_VALIDATORS.push({
      publicKey: isValidatorExists.publicKey,
      validator: ws,
      validatorId: isValidatorExists.id,
    });
    return;
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
      data: {
        callbackId: data.callbackId,
        validatorId: newValidator.id,
        publicKey: data.publicKey,
        ip: data.ip,
        location: data.location,
        signedMessage: data.signedMessage,
      },
    }),
  );
};

setInterval(async () => {
  const allWebsites = await prismaClient.website.findMany();
  AVAILABLE_VALIDATORS.forEach((validator) => {
    allWebsites.forEach((website) => {
      const callbackId = crypto.randomUUID();
      validator.validator.send(
        JSON.stringify({
          type: "validate",
          data: {
            callbackId,
            websiteUrl: website.url,
          },
        }),
      );
      CALLBACKS[callbackId] = async (data: IncomingMessageHub) => {
        if (data.type === "validate") {
          const { status, latency, signedMessage, validatorId } = data.data;

          const verified = verifyMessage(
            `Replying to validation request ${callbackId}`,
            signedMessage,
            validator.publicKey,
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
                websiteId: website.id,
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
