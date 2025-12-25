package https.miqueiasbento.github.io.producer.share.globalExceptions;

public record ErrorResponseDTO(String field, String message, Integer statusCode, String error) {
}
