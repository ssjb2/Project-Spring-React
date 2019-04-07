package gb.exceptions;

public class GroupNotFoundExceptionResponse {

    private String ProjectNotFound;

    public String getProjectNotFound() {
        return ProjectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }

    public GroupNotFoundExceptionResponse(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }
}
