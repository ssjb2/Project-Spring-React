package gb.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleGroupIdException(GroupIdException ex , WebRequest request){
        GroupIdExceptionsResponse exceptionsResponse = new GroupIdExceptionsResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionsResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleGroupNotFoundException(GroupNotFoundException ex , WebRequest request){
        GroupNotFoundExceptionResponse exceptionsResponse = new GroupNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionsResponse, HttpStatus.BAD_REQUEST);
    }
}
