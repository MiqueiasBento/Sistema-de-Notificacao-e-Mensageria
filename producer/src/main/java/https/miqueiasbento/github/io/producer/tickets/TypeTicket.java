package https.miqueiasbento.github.io.producer.tickets;

import lombok.Getter;

@Getter
public enum TypeTicket {
    TECNICO("tecnico"),
    FINANCEIRO("financeiro"),
    COMERCIAL("comercial"),
    OUTRO("outro"),;
    private final String value;
    TypeTicket(String value) {
        this.value = value;
    }
}
