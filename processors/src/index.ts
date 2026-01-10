import "dotenv/config";
import { pollMessages } from "./messaging/SqsListener";

async function start() {
  console.log("Processor iniciado...");
  while (true) {
    await pollMessages();
  }
}

start();
