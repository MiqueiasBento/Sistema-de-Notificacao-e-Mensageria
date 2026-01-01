package https.miqueiasbento.github.io.producer.event.model;

import lombok.Getter;

import java.time.Instant;

@Getter
public abstract class BaseTicketEvent {
    private final String eventId;
    private final String eventType;
    private final Instant occurredAt;

    protected BaseTicketEvent(String eventId, String eventType, Instant occurredAt) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.occurredAt = occurredAt;
    }
}
