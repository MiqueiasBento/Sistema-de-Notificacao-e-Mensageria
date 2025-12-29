package https.miqueiasbento.github.io.producer.share.globalExceptions;

public class ResourceWithSameNameException extends ApplicationException {

    public ResourceWithSameNameException(String field, String message) {
        super(field, message);
    }

    public ResourceWithSameNameException(String field) {
        super(field, "ja existe um(a) " + field + " com o mesmo valor ja cadastrado no sitema");
    }
}
