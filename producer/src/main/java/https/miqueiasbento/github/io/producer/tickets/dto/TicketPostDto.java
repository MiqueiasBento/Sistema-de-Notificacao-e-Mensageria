package https.miqueiasbento.github.io.producer.tickets.dto;

import https.miqueiasbento.github.io.producer.tickets.TypeTicket;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TicketPostDto(
        @NotBlank(message = "O nome do usuário deve ser informado.")
        String username,

        @NotBlank(message = "O email de contato deve ser informado.")
        String email,

        @NotNull(message = "O tipo chamado deve ser informado.")
        TypeTicket type,

        @NotBlank(message = "A descrição do chamado deve ser informada.")
        String description
) {
}
