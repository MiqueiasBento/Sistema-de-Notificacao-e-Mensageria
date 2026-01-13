import { TicketClosedEvent } from "../events/ticket";
import { Notification } from "../services/notification/Notification";

export async function handleTicketClosed(event: TicketClosedEvent): Promise<Notification> {
  console.log("Processando TicketClosed:", event.ticket.id);

  return {
    channel: "EMAIL",
    recipient: event.ticket.user.email,
    templateKey: "TICKET_CLOSED",
    data: {
      name: event.ticket.user.name,
      ticketId: event.ticket.id,
      title: event.ticket.title,
      type: event.ticket.type
    }
  };
}
