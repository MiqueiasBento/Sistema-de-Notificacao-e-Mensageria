package https.miqueiasbento.github.io.producer.tickets.dto;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import https.miqueiasbento.github.io.producer.tickets.TypeTicket;
import https.miqueiasbento.github.io.producer.users.dto.UserDto;

import java.time.LocalDateTime;

public record TicketDto(
        Long id,
        UserDto user,
        String title,
        String description,
        TypeTicket type,
        StatusTicket status,
        LocalDateTime createAt
) {
}
