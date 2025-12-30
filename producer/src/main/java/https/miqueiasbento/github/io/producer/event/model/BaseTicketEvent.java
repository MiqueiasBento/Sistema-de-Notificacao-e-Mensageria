package https.miqueiasbento.github.io.producer.event.model;

import java.time.Instant;

public abstract class BaseTicketEvent {
    private String eventId;
    private String eventType;
    private Instant occurredAt;

    protected BaseTicketEvent(String eventId, String eventType, Instant occurredAt) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.occurredAt = occurredAt;
    }

    // Getters
    public String getEventId() {
        return eventId;
    }

    public String getEventType() {
        return eventType;
    }

    public Instant getOccurredAt() {
        return occurredAt;
    }
}
