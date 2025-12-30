package https.miqueiasbento.github.io.producer.event.model;

import java.time.Instant;

public class TicketUpdatedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;

    public TicketUpdatedEvent(String eventId, Instant occurredAt, TicketEventPayload ticket) {
        super(eventId, "TICKET_UPDATED", occurredAt);
        this.ticket = ticket;
    }

    public TicketEventPayload getTicket() {
        return ticket;
    }
}
