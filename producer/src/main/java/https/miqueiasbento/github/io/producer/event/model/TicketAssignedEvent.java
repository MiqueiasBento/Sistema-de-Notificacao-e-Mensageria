package https.miqueiasbento.github.io.producer.event.model;

import lombok.Getter;

import java.time.Instant;

@Getter
public class TicketAssignedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;
    private final UserEventPayload agent;

    public TicketAssignedEvent(String eventId, Instant occurredAt, TicketEventPayload ticket, UserEventPayload agent) {
        super(eventId, "TICKET_ASSIGNED", occurredAt);
        this.ticket = ticket;
        this.agent = agent;
    }
}
