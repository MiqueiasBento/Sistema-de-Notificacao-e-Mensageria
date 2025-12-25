package https.miqueiasbento.github.io.producer.share.globalExceptions;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorResponseDTO>> handleValidationException(MethodArgumentNotValidException e) {
        List<ErrorResponseDTO> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new ErrorResponseDTO(
                        error.getField(),
                        error.getDefaultMessage(),
                        HttpStatus.BAD_REQUEST.value(),
                        HttpStatus.BAD_REQUEST.getReasonPhrase()
                ))
                .toList();

        return ResponseEntity.badRequest().body(errors);
    }

//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(UserNotFoundException e) {
//        HttpStatus status = HttpStatus.NOT_FOUND;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }
//
//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(ResourceNotFoundException e) {
//        HttpStatus status = HttpStatus.NOT_FOUND;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }
//
//    @ExceptionHandler(UserNotAuthenticatedException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(UserNotAuthenticatedException e) {
//        HttpStatus status = HttpStatus.UNAUTHORIZED;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }
//
//    @ExceptionHandler(DeniedAccessException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(DeniedAccessException e) {
//        HttpStatus status = HttpStatus.FORBIDDEN;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }
//
//    @ExceptionHandler(EntityDoesNotBelongToAnotherEntityException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(EntityDoesNotBelongToAnotherEntityException e) {
//        HttpStatus status = HttpStatus.FORBIDDEN;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }
//
//    @ExceptionHandler(ResourceWithSameNameException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(ResourceWithSameNameException e) {
//        HttpStatus status = HttpStatus.CONFLICT;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }
//
//    @ExceptionHandler(ExistentResourceException.class)
//    public ResponseEntity<ErrorResponseDTO> handleException(ExistentResourceException e) {
//        HttpStatus status = HttpStatus.CONFLICT;
//        ErrorResponseDTO error = new ErrorResponseDTO(
//                e.getField(),
//                e.getMessage(),
//                status.value(),
//                status.getReasonPhrase()
//        );
//        return ResponseEntity.status(status).body(error);
//    }

    // Tratamento para BadRequestException (400)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponseDTO> handleBadRequestException(BadRequestException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErrorResponseDTO error = new ErrorResponseDTO(
                "Campo inválido fornecido",
                ex.getMessage(),
                status.value(),
                status.getReasonPhrase()
        );
        return ResponseEntity.status(status).body(error);
    }

    // Tratamento para ResourceNotFoundException (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        ErrorResponseDTO error = new ErrorResponseDTO(
                "Campo inválido fornecido",
                ex.getMessage(),
                status.value(),
                status.getReasonPhrase()
        );
        return ResponseEntity.status(status).body(error);
    }

    // Tratamento para Exceções Genéricas (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleAllExceptions(Exception ex) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorResponseDTO error = new ErrorResponseDTO(
                "Campo inválido fornecido",
                ex.getMessage(),
                status.value(),
                status.getReasonPhrase()
        );
        return ResponseEntity.status(status).body(error);
    }
}
