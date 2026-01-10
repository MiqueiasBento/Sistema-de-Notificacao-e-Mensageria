import { TicketCreatedEvent } from "../events/ticket";


export async function handleTicketCreated(event: TicketCreatedEvent) {
  console.log("Processando TicketCreated:", event.ticket.id);

  const subject = `Novo Ticket Criado: ${event.ticket.id}`;
  const body = `Olá, 
    
    Recebemos seu ticket "${event.ticket.description}".
    Em breve entraremos em contato.
    
    Atenciosamente,
    Equipe de Suporte`;

  return {
    subject,
    body,
    recipient: event.ticket.customerEmail // Extraindo o destinatário aqui por conveniência
  };
}
