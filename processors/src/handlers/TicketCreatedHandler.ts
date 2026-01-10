import { TicketCreatedEvent } from "../events/ticket";
import { Notification } from "../services/notification/Notification";

export async function handleTicketCreated(event: TicketCreatedEvent): Promise<Notification> {
  console.log("Processando TicketCreated:", event.ticket.id);

  return {
    channel: "EMAIL", // Default, será sobrescrito pelo Router se necessário ou tratado diferente
    recipient: event.ticket.customerEmail,
    templateKey: "TICKET_CREATED",
    data: {
      name: "Cliente", // Deveria vir do evento, mas vamos usar placeholder
      ticketId: event.ticket.id,
      title: event.ticket.description,
      type: "Incidente" // Placeholder
    }
  };
}
