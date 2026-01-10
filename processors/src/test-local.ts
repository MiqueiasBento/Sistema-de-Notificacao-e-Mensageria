import { routeEvent } from "./messaging/eventRouter";
import { TicketCreatedEvent } from "./events/ticket";

// Simula um evento (Baseado em events/ticket.ts)
const mockEvent: TicketCreatedEvent = {
  eventType: "TICKET_CREATED",
  ticket: {
    id: "TICKET-123",
    description: "Problema com login",
    customerEmail: "cliente@exemplo.com",
    channels: ["EMAIL", "WHATSAPP_FAKE"]
  }
};

console.log("--- Iniciando Teste Local ---");
routeEvent(mockEvent)
  .then(() => console.log("--- Teste Finalizado ---"))
  .catch((err) => console.error("Erro no teste:", err));
