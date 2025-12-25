package https.miqueiasbento.github.io.producer.share.globalExceptions;

public class UserNotFoundException extends ApplicationException {
    public UserNotFoundException(String field) {
        super(field, "Usuário não encontrado");
    }
    public UserNotFoundException(String field, String message) {
        super(field, message);
    }
}
