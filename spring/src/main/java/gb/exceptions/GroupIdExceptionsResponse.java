package gb.exceptions;




public class GroupIdExceptionsResponse {

    private String groupIdentifier;

    public GroupIdExceptionsResponse(String groupIdentifier){
        this.groupIdentifier= groupIdentifier;
    }

    public String getGroupIdentifier() {
        return groupIdentifier;
    }

    public void setGroupIdentifier(String groupIdentifier) {
        this.groupIdentifier = groupIdentifier;
    }
}
