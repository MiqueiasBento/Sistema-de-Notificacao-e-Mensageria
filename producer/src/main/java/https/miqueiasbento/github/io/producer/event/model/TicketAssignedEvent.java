package https.miqueiasbento.github.io.producer.event.model;

import java.time.Instant;

public class TicketAssignedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;
    private final UserEventPayload agent;

    public TicketAssignedEvent(String eventId, Instant occurredAt, TicketEventPayload ticket, UserEventPayload agent) {
        super(eventId, "TICKET_ASSIGNED", occurredAt);
        this.ticket = ticket;
        this.agent = agent;
    }

    public TicketEventPayload getTicket() {
        return ticket;
    }

    public UserEventPayload getAgent() {
        return agent;
    }
}
