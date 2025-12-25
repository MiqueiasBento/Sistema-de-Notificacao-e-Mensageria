package https.miqueiasbento.github.io.producer.users.dto;

import https.miqueiasbento.github.io.producer.users.authorization.Role;

import java.util.UUID;

public record UserDto(
        UUID id,
        String name,
        String email,
        Boolean active,
        Role role
) {
}
