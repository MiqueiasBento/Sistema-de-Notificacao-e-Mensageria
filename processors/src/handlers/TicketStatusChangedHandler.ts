import { TicketStatusChangedEvent } from "../events/ticket";
import { Notification } from "../services/notification/Notification";

export async function handleTicketStatusChanged(event: TicketStatusChangedEvent): Promise<Notification> {
  console.log("Processando TicketStatusChanged:", event.ticket.id, `(${event.oldStatus} -> ${event.newStatus})`);

  return {
    channel: "EMAIL",
    recipient: event.ticket.user.email,
    templateKey: "TICKET_STATUS_CHANGED",
    data: {
      name: event.ticket.user.name,
      ticketId: event.ticket.id,
      title: event.ticket.title,
      type: event.ticket.type,
      status: event.newStatus,
      oldStatus: event.oldStatus
    }
  };
}
