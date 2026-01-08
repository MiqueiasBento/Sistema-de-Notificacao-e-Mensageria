import { pollMessages } from "./messaging/sqsListener";

async function start() {
  console.log("Processor iniciado...");
  while (true) {
    await pollMessages();
  }
}

start();
