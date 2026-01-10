export interface TicketCreatedEvent {
  eventType: "TICKET_CREATED";
  ticket: {
    id: string;
    description: string;
    customerEmail: string;
    channels: string[];
  };
}
