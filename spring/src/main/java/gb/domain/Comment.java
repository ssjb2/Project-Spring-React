package gb.domain;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String body;

    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date dueDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date updated_At;

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public GroupPost getPost() {
        return post;
    }

    public void setPost(GroupPost post) {
        this.post = post;
    }

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User author;

    @ManyToOne
    @JoinColumn(name="post_id", nullable = false)
    private GroupPost post;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}

