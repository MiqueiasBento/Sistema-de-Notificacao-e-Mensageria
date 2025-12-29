package https.miqueiasbento.github.io.producer.users.dto;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;

public record UserRegisterDTO(
        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
        String name,

        @NotBlank(message = "O e-mail é obrigatório")
        @Size(min = 5, max = 100, message = "O e-mail deve ter entre 5 e 100 caracteres")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres")
        String password
) {
}
