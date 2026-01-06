package https.miqueiasbento.github.io.producer.event.model;

import lombok.Getter;

@Getter
public class TicketUpdatedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;

    public TicketUpdatedEvent(String eventId, String occurredAt, TicketEventPayload ticket) {
        super(eventId, "TICKET_UPDATED", occurredAt);
        this.ticket = ticket;
    }
}
