package https.miqueiasbento.github.io.producer.event.model;

import java.time.Instant;

public class TicketClosedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;

    public TicketClosedEvent(String eventId, Instant occurredAt, TicketEventPayload ticket) {
        super(eventId, "TICKET_CLOSED", occurredAt);
        this.ticket = ticket;
    }

    public TicketEventPayload getTicket() {
        return ticket;
    }
}
