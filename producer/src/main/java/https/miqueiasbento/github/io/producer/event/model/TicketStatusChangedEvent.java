package https.miqueiasbento.github.io.producer.event.model;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import java.time.Instant;

public class TicketStatusChangedEvent extends BaseTicketEvent {
    private final TicketEventPayload ticket;
    private final StatusTicket oldStatus;
    private final StatusTicket newStatus;

    public TicketStatusChangedEvent(String eventId, Instant occurredAt, TicketEventPayload ticket,
            StatusTicket oldStatus, StatusTicket newStatus) {
        super(eventId, "TICKET_STATUS_CHANGED", occurredAt);
        this.ticket = ticket;
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
    }

    public TicketEventPayload getTicket() {
        return ticket;
    }

    public StatusTicket getOldStatus() {
        return oldStatus;
    }

    public StatusTicket getNewStatus() {
        return newStatus;
    }
}
