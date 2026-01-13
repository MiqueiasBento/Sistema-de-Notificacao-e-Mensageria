import { handleTicketCreated } from "../handlers/TicketCreatedHandler";
import { handleTicketStatusChanged } from "../handlers/TicketStatusChangedHandler";
import { handleTicketClosed } from "../handlers/TicketClosedHandler";
import { notificationService } from "../config/container";
import { Notification } from "../services/notification/Notification";

async function sendNotificationToChannels(baseNotification: Notification, channels: string[]) {
  // Ler os canais definidos no evento
  const eventChannels = channels || [];
  console.log(`[EventRouter] Canais identificados: ${eventChannels.join(", ")}`);

  // Para cada canal, clonar a notificação e enviar
  for (const channel of eventChannels) {
    try {
      console.log(`[EventRouter] Roteando para ${channel}...`);
      
      // Clona e ajusta o canal
      const notification = { 
        ...baseNotification, 
        channel: channel as any 
      };

      await notificationService.send(notification);

    } catch (err) {
        console.error(`[EventRouter] Erro ao enviar por ${channel}:`, err);
    }
  }
}

export async function routeEvent(event: any) {
  console.log(`[EventRouter] Recebido evento: ${event.eventType}`);

  switch (event.eventType) {
    case "TICKET_CREATED":
      // Obter dados base da notificação
      const baseNotification = await handleTicketCreated(event);
      await sendNotificationToChannels(baseNotification, event.ticket.channels);
      break;

    case "TICKET_STATUS_CHANGED":
      // Obter dados base da notificação
      const statusChangedNotification = await handleTicketStatusChanged(event);
      await sendNotificationToChannels(statusChangedNotification, event.ticket.channels);
      break;

    case "TICKET_CLOSED":
      // Obter dados base da notificação
      const closedNotification = await handleTicketClosed(event);
      await sendNotificationToChannels(closedNotification, event.ticket.channels);
      break;

    default:
      console.warn("Evento não tratado:", event.eventType);
  }
}
