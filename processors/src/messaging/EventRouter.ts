import { handleTicketCreated } from "../handlers/TicketCreatedHandler";
import { notificationService } from "../config/container";

export async function routeEvent(event: any) {
  console.log(`[EventRouter] Recebido evento: ${event.eventType}`);

  switch (event.eventType) {
    case "TICKET_CREATED":
      // Obter dados base da notificação
      const baseNotification = await handleTicketCreated(event);
      
      // Ler os canais definidos no evento
      const channels = event.ticket.channels || [];
      console.log(`[EventRouter] Canais identificados: ${channels.join(", ")}`);

      // Para cada canal, clonar a notificação e enviar
      for (const channel of channels) {
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
      break;

    default:
      console.warn("Evento não tratado:", event.eventType);
  }
}
