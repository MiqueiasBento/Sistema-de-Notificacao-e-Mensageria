import "dotenv/config";
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
        email: process.env.EMAIL_TO || "cliente@exemplo.com"
    },
    channels: ["EMAIL", "PUSH"]
  }
};

console.log("--- Iniciando Teste Local ---");
console.log(`Enviando email para: ${mockEvent.ticket.user.email}`);

routeEvent(mockEvent)
  .then(() => console.log("--- Teste Finalizado ---"))
  .catch((err) => console.error("Erro no teste:", err));

