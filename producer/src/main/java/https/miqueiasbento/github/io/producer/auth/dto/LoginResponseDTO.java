package https.miqueiasbento.github.io.producer.auth.dto;


import https.miqueiasbento.github.io.producer.users.authorization.Role;

import java.util.UUID;

public record LoginResponseDTO(
        String token,
        String email,
        String name,
        Role role) {
}
