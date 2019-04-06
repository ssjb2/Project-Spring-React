package gb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer GPSequence = 0;
    private String groupIdentifier;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id", nullable = false)
    @JsonIgnore
    private Groups group;

    @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.EAGER, mappedBy = "backlog")
    private List<GroupPost> groupPost = new ArrayList<>();
    public Backlog() {
    }

    public Long getId() {
        return id;
    }

    public List<GroupPost> getGroupPost() {
        return groupPost;
    }

    public void setGroupPost(List<GroupPost> groupPost) {
        this.groupPost = groupPost;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGPSequence() {
        return GPSequence;
    }

    public void setGPSequence(Integer GPSequence) {
        this.GPSequence = GPSequence;
    }

    public Groups getGroup() {
        return group;
    }

    public void setGroup(Groups group) {
        this.group = group;
    }

    public String getGroupIdentifier() {
        return groupIdentifier;
    }

    public void setGroupIdentifier(String groupIdentifier) {
        this.groupIdentifier = groupIdentifier;
    }
}
