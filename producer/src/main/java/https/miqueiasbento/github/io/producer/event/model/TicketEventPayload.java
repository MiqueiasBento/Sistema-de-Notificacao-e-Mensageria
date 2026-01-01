package https.miqueiasbento.github.io.producer.event.model;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import https.miqueiasbento.github.io.producer.tickets.TypeTicket;

public record TicketEventPayload(
        Long id,
        String title,
        String description,
        TypeTicket type,
        StatusTicket status,
        String createAt,
        UserEventPayload user,
        UserEventPayload agent) {
}
