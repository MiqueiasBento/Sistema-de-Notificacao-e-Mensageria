export async function handleTicketCreated(event: any) {
  console.log("Processando TicketCreated:", event.ticket.id);

  // futuramente:
  // - buscar template
  // - enviar notificação
}
