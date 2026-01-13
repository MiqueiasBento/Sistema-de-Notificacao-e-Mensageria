import { TicketCreatedEvent } from "../events/ticket";
import { Notification } from "../services/notification/Notification";

function formatDate(dateString?: string): string {
  if (!dateString) return "Data não disponível";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return dateString;
  }
}

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
      description: event.ticket.description || "Sem descrição",
      type: event.ticket.type,
      status: event.ticket.status,
      createAt: formatDate(event.ticket.createAt),
      agentName: event.ticket.agent?.name || "Aguardando atribuição"
    }
  };
}
