package https.miqueiasbento.github.io.producer.tickets;

import lombok.Getter;

@Getter
public enum Channel {
    EMAIL("email"),
    PUSH("push");

    private final String value;

    Channel(String value) {
        this.value = value;
    }
}
