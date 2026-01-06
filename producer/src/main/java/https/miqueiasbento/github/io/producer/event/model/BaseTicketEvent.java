package https.miqueiasbento.github.io.producer.event.model;

import lombok.Getter;

@Getter
public abstract class BaseTicketEvent {
    private final String eventId;
    private final String eventType;
    private final String occurredAt;

    protected BaseTicketEvent(String eventId, String eventType, String occurredAt) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.occurredAt = occurredAt;
    }
}
