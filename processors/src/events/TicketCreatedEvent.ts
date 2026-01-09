export interface BaseEvent {
  eventId: string;
  eventType: string;
  occurredAt: string;
}

export interface TicketCreatedEvent extends BaseEvent {
  ticket: {
    id: number;
    title: string;
    description: string;
    status: string;
    channels: string[];
  };
}
