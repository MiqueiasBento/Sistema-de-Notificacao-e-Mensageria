import { TicketCreatedEvent } from "../events/ticket";
import { emailService } from "../services/emailService";

export async function handleTicketCreated(event: TicketCreatedEvent) {
  console.log("Processando TicketCreated:", event.ticket.id);

  try {
    const subject = `Novo Ticket Criado: ${event.ticket.id}`;
    const body = `Olá, 
    
    Recebemos seu ticket "${event.ticket.description}".
    Em breve entraremos em contato.
    
    Atenciosamente,
    Equipe de Suporte`;

    await emailService.sendEmail(event.ticket.customerEmail, subject, body);
    console.log(`Notificação enviada com sucesso para ${event.ticket.customerEmail}`);
  } catch (error) {
    console.error("Erro ao processar envio de email:", error);
  }
}
