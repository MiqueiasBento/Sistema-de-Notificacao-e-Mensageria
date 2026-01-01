package https.miqueiasbento.github.io.producer.event.model;

import lombok.Getter;

@Getter
public class TicketCreatedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;

    public TicketCreatedEvent(String eventId, String occurredAt, TicketEventPayload ticket) {
        super(eventId, "TICKET_CREATED", occurredAt);
        this.ticket = ticket;
    }

}
