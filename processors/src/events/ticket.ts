export interface TicketCreatedEvent {
  eventType: "TICKET_CREATED";
  ticket: {
    id: string | number;
    title: string;
    description: string;
    type: string;
    status: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    channels?: string[]; // Opcional no JSON cru, mas necessário pro router (vamos tratar)
  };
}

export interface TicketStatusChangedEvent {
  eventType: "TICKET_STATUS_CHANGED";
  ticket: {
    id: string | number;
    title: string;
    description: string;
    type: string;
    status: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    channels?: string[];
  };
  oldStatus: string;
  newStatus: string;
}

export interface TicketClosedEvent {
  eventType: "TICKET_CLOSED";
  ticket: {
    id: string | number;
    title: string;
    description: string;
    type: string;
    status: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    channels?: string[];
  };
}