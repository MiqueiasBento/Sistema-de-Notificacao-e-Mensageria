import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/aws";
import { routeEvent } from "./eventRouter";

const QUEUE_URL = process.env.QUEUE_URL!;

export async function pollMessages() {
  const command = new ReceiveMessageCommand({
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
  });

  const response = await sqsClient.send(command);

  if (!response.Messages) return;

  for (const message of response.Messages) {
    if (!message.Body) continue;

    const event = JSON.parse(message.Body);
    await routeEvent(event);
  }
}
