package https.miqueiasbento.github.io.producer.event.model;

import lombok.Getter;

import java.time.Instant;

@Getter
public class TicketCreatedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;

    public TicketCreatedEvent(String eventId, Instant occurredAt, TicketEventPayload ticket) {
        super(eventId, "TICKET_CREATED", occurredAt);
        this.ticket = ticket;
    }

}
