import { routeEvent } from "./messaging/eventRouter";
import { TicketCreatedEvent } from "./events/ticket";

// Simula um evento (Baseado em events/ticket.ts)
const mockEvent: TicketCreatedEvent = {
  eventType: "TICKET_CREATED",
  ticket: {
    id: "TICKET-123",
    title: "Problema Login",
    description: "Problema com login",
    type: "INCIDENTE",
    status: "OPEN",
    user: {
        id: "u1",
        name: "Teste Teste",
        email: "cliente@exemplo.com"
    },
    channels: ["EMAIL", "PUSH"]
  }
};

console.log("--- Iniciando Teste Local ---");
routeEvent(mockEvent)
  .then(() => console.log("--- Teste Finalizado ---"))
  .catch((err) => console.error("Erro no teste:", err));
