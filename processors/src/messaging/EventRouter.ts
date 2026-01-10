import { handleTicketCreated } from "../handlers/TicketCreatedHandler";
import { emailService } from "../services/emailService";

export async function routeEvent(event: any) {
  console.log(`[EventRouter] Recebido evento: ${event.eventType}`);

  switch (event.eventType) {
    case "TICKET_CREATED":
      // 1. Obter dados da notificação (Subject, Body) a partir do handler
      const notificationData = await handleTicketCreated(event);
      
      // 2. Ler os canais definidos no evento
      const channels = event.ticket.channels || [];
      console.log(`[EventRouter] Canais identificados: ${channels.join(", ")}`);

      // 3. Para cada canal, chamar o serviço correto
      for (const channel of channels) {
        try {
          if (channel === "EMAIL") {
            console.log(`[EventRouter] Roteando para EmailService...`);
            await emailService.sendEmail(
              notificationData.recipient,
              notificationData.subject,
              notificationData.body
            );
          } else {
            console.warn(`[EventRouter] Canal não suportado: ${channel}`);
          }
        } catch (err) {
            console.error(`[EventRouter] Erro ao enviar por ${channel}:`, err);
        }
      }
      break;

    default:
      console.warn("Evento não tratado:", event.eventType);
  }
}
