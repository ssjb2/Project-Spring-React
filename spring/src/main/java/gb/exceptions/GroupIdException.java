package gb.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GroupIdException extends RuntimeException{
    public GroupIdException(String message) {
        super(message);
    }
}
