package https.miqueiasbento.github.io.producer.event.model;

import java.util.UUID;

public record UserEventPayload(
        UUID id,
        String name,
        String email) {
}
