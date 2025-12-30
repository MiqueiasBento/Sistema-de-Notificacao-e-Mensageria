package https.miqueiasbento.github.io.producer.event.model;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import https.miqueiasbento.github.io.producer.tickets.TypeTicket;

import java.time.LocalDateTime;

public record TicketEventPayload(
        Long id,
        String title,
        String description,
        TypeTicket type,
        StatusTicket status,
        LocalDateTime createAt,
        UserEventPayload user,
        UserEventPayload agent) {
}
