import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";
import "dotenv/config";
import bs58 from "bs58";

export interface ISignUpRequestResponse {
  validatorId: string;
  callbackId: string;
}

export interface IValidationRequest {
  callbackId: string;
  websiteUrl: string;
}

type IncomingMessageValidator =
  | { type: "signup"; data: ISignUpRequestResponse }
  | { type: "validate"; data: IValidationRequest };

let validatorId: string | null = null;

const CALLBACKS: {
  [callbackId: string]: (data: ISignUpRequestResponse) => void;
} = {};

async function main() {

  const keyPair = Keypair.fromSecretKey(
    bs58.decode(process.env.PRIVATE_KEY as string)
  );
  // const keyPair = Keypair.fromSecretKey(
  //   Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY as string)),
  // );

  const ws = new WebSocket(process.env.WS_URL as string);

  ws.onmessage = async (event) => {
    const message: IncomingMessageValidator = JSON.parse(event.data);

    if (message.type === "signup") {
      CALLBACKS[message.data.callbackId](message.data);
      delete CALLBACKS[message.data.callbackId];
    } else if (message.type === "validate") {
      const { callbackId, websiteUrl } = message.data;
      ValidateWebsiteHandler(websiteUrl, callbackId, ws, keyPair);
    }
  };
  ws.onopen = async () => {
    const callbackId = crypto.randomUUID();
    CALLBACKS[callbackId] = (data: ISignUpRequestResponse) => {
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
          ip: "0.0.0.0",
          location: "chd",
          publicKey: keyPair.publicKey,
          callbackId,
          signedMessage,
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

setInterval(async () => { }, 10000);
