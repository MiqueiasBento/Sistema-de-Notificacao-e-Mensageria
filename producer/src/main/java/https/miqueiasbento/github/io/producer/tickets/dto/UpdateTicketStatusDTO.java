package https.miqueiasbento.github.io.producer.tickets.dto;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import jakarta.validation.constraints.NotNull;

public record UpdateTicketStatusDTO(
        @NotNull(message = "Status is required") StatusTicket status) {
}
