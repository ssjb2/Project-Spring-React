package gb.domain;

import java.util.ArrayList;
import java.util.List;

public class FriendDTO {
    private Long id;
    private String username;

 private  List<FriendDTO> friends = new ArrayList<>();
    private List<FriendDTO> sendInvites = new ArrayList<>();
    private List<FriendDTO> receiveInvites = new ArrayList<>();

    public List<FriendDTO> getSendInvites() {
        return sendInvites;
    }

    public void setSendInvites(List<FriendDTO> sendInvites) {
        this.sendInvites = sendInvites;
    }

    public List<FriendDTO> getReceiveInvites() {
        return receiveInvites;
    }

    public void setReceiveInvites(List<FriendDTO> receiveInvites) {
        this.receiveInvites = receiveInvites;
    }

    public List<FriendDTO> getFriends() {
        return friends;
    }

    public void setFriends(List<FriendDTO> friends) {
        this.friends = friends;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
