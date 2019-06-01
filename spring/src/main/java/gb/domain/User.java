package gb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Username is reqiured")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Password can not be blank")
    @Size(min = 6)
    private String password;

    @Transient
    private String confirmPassword;

    //profile
    private String about;
    private String hobbies;
    private String games;
    private String logo;
    private Integer age;

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getHobbies() {
        return hobbies;
    }

    public void setHobbies(String hobbies) {
        this.hobbies = hobbies;
    }

    public String getGames() {
        return games;
    }

    public void setGames(String games) {
        this.games = games;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @ManyToMany(mappedBy = "usersInGroup")
    @JsonIgnore
    private List<Groups> myGroups;

    public List<Groups> getMyGroups() {
        return myGroups;
    }

    public void setMyGroups(List<Groups> myGroups) {
        this.myGroups = myGroups;
    }

public void addFriend(User user){
        this.friends.add(user);
}
public void sendInv(User user){
        this.sendInvites.add(user);
}
public void receiveInv(User user){
        this.receiveInvites.add(user);
}
public void removesSendedInv(User user){
        this.sendInvites.remove(user);

}
public void removeReceivedInv(User user){
        this.receiveInvites.remove(user);
}

    @ManyToMany
    @JsonIgnore
    private List<User> friends;

    @ManyToMany
    @JsonIgnore

    private List<User> sendInvites;
    @ManyToMany
    @JsonIgnore
    private List<User> receiveInvites;

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public List<User> getSendInvites() {
        return sendInvites;
    }

    public void setSendInvites(List<User> sendInvites) {
        this.sendInvites = sendInvites;
    }

    public List<User> getReceiveInvites() {
        return receiveInvites;
    }

    public void setReceiveInvites(List<User> receiveInvites) {
        this.receiveInvites = receiveInvites;
    }

    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private List<Comment> comments;

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
