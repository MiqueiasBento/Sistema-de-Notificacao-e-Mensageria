package https.miqueiasbento.github.io.producer.share.globalExceptions;

public class EntityDoesNotBelongToAnotherEntityException extends ApplicationException {
    public EntityDoesNotBelongToAnotherEntityException(String childEntity, String parentEntity) {
        super(childEntity, childEntity + " nao pertece a(o) " + parentEntity);
    }
}
