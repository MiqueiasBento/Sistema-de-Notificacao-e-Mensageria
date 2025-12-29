package https.miqueiasbento.github.io.producer.share.globalExceptions;

public class ExistentResourceException extends ApplicationException {
    public ExistentResourceException(String field) {
        super(field, "ja existe um " + field + "ja cadastrado no sistema para o usuário");
    }
}