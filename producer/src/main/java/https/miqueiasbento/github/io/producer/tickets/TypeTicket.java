package https.miqueiasbento.github.io.producer.tickets;

import lombok.Getter;

@Getter
public enum TypeTicket {
    TECNICO("Tecnico"),
    FINANCEIRO("Financeiro"),
    COMERCIAL("Comercial"),
    OUTRO("Outro"),;
    private final String value;
    TypeTicket(String value) {
        this.value = value;
    }
}
