package https.miqueiasbento.github.io.producer.tickets.dto;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import https.miqueiasbento.github.io.producer.tickets.TypeTicket;
import java.time.LocalDateTime;

public record TicketResponseDTO(
                Long id,
                String title,
                String description,
                TypeTicket type,
                StatusTicket status,
                LocalDateTime createAt,
                String userName,
                String agentName) {
}
