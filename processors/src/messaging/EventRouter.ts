import { handleTicketCreated } from "../handlers/TicketCreatedHandler";

export async function routeEvent(event: any) {
  switch (event.eventType) {
    case "TICKET_CREATED":
      await handleTicketCreated(event);
      break;

    default:
      console.warn("Evento não tratado:", event.eventType);
  }
}
