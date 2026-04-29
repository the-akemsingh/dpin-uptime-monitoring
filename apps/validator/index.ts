import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";
import "dotenv/config";

interface OutgoingSignUpMessage {
  publicKey: string;
  ip: string;
  location: string;
  callbackId: string;
  signedMessage: string;
  validatorId: string;
}
interface OutgoingValidateMessage {
  status: "Good" | "Bad";
  latency: number;
  callbackId: string;
  signedMessage: string;
  validatorId: string;
  websiteUrl: string;
}

type OutgoingMessage =
  | { type: "signup"; data: OutgoingSignUpMessage }
  | { type: "validate"; data: OutgoingValidateMessage };

let validatorId: string | null = null;

const CALLBACKS: {
  [callbackId: string]: (data: OutgoingSignUpMessage) => void;
} = {};

async function main() {
  const keyPair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY as string)),
  );

  const ws = new WebSocket(process.env.WS_URL as string);

  ws.onmessage = async (event) => {
    const message: OutgoingMessage = JSON.parse(event.data);

    if (message.type === "signup") {
      // if (CALLBACKS[message.data.callbackId]) {
        CALLBACKS[message.data.callbackId](message.data);
        delete CALLBACKS[message.data.callbackId];
      // } else {
      //   console.error(
      //     `No callback found for callbackId: ${message.data.callbackId}`,
      //   );
      // }
    } else if (message.type === "validate") {
      const { callbackId, websiteUrl } = message.data;
      ValidateWebsiteHandler(websiteUrl, callbackId, ws, keyPair);
    }
  };
  ws.onopen = async () => {
    const callbackId = crypto.randomUUID();
    CALLBACKS[callbackId] = (data: OutgoingSignUpMessage) => {
      validatorId = data.validatorId;
    };

    const signedMessage = await SignMessageHandler(
      `Signup request for ${callbackId} - ${keyPair.publicKey}`,
      keyPair,
    );
    ws.send(
      JSON.stringify({
        type: "signup",
        data: {
          callbackId,
          signedMessage,
          publicKey: keyPair.publicKey,
          ip: "0.0.0.0",
          location: "chd",
        },
      }),
    );
  };
}

async function ValidateWebsiteHandler(
  websiteUrl: string,
  callbackId: string,
  ws: WebSocket,
  keyPair: Keypair,
) {
  console.log(`validating the website ${websiteUrl}`);
  const signedMessage = await SignMessageHandler(
    `Replying to validation request ${callbackId}`,
    keyPair,
  );
  try {
    const startTime = Date.now();
    const res = await fetch(websiteUrl);
    const endTime = Date.now();
    const latency = endTime - startTime;
    const status = res.status;
    ws.send(
      JSON.stringify({
        type: "validate",
        data: {
          latency,
          status: status === 200 ? "Good" : "Bad",
          signedMessage,
          callbackId,
          validatorId,
          websiteUrl,
        },
      }),
    );
  } catch (e) {
    ws.send(
      JSON.stringify({
        type: "validate",
        data: {
          callbackId,
          status: "Bad",
          latency: 1000,
          validatorId,
          signedMessage,
        },
      }),
    );
    console.error(e);
  }
}

async function SignMessageHandler(message: string, keypair: Keypair) {
  const messageBytes = nacl_util.decodeUTF8(message);
  const signature = nacl.sign.detached(messageBytes, keypair.secretKey);

  return JSON.stringify(Array.from(signature));
}

main();

setInterval(async () => {}, 10000);
