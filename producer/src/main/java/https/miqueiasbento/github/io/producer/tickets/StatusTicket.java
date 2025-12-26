package https.miqueiasbento.github.io.producer.tickets;

import lombok.Getter;

@Getter
public enum StatusTicket {
    PENDENTE("pendente"),
    EM_ANDAMENTO("em_andamento"),
    RESOLVIDO("resolvido");

    private final String value;

    StatusTicket(String value) {
        this.value = value;
    }
}
