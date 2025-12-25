package https.miqueiasbento.github.io.producer.share.globalExceptions;

public class DeniedAccessException extends ApplicationException {
    public DeniedAccessException(String field, String message) {
        super(field, message);
    }
    public DeniedAccessException(String field) {
        super(field, "Acesso negado");
    }
}
