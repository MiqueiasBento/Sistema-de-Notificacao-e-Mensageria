import { TicketCreatedEvent } from "../events/ticket";
import { Notification } from "../services/notification/Notification";

export async function handleTicketCreated(event: TicketCreatedEvent): Promise<Notification> {
  console.log("Processando TicketCreated:", event.ticket.id);

  return {
    channel: "EMAIL",
    recipient: event.ticket.user.email,
    templateKey: "TICKET_CREATED",
    data: {
      name: event.ticket.user.name,
      ticketId: event.ticket.id,
      title: event.ticket.title,
      type: event.ticket.type
    }
  };
}
