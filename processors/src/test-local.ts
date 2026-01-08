import { handleTicketCreated } from "./handlers/TicketCreatedHandler";
import { TicketCreatedEvent } from "./events/ticket";

// Simula um evento
const mockEvent: TicketCreatedEvent = {
  eventType: "TICKET_CREATED",
  ticket: {
    id: "TICKET-123",
    description: "Problema com login",
    customerEmail: "cliente@exemplo.com"
  }
};

console.log("--- Iniciando Teste Local ---");
handleTicketCreated(mockEvent)
  .then(() => console.log("--- Teste Finalizado ---"))
  .catch((err) => console.error("Erro no teste:", err));
