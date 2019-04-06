package gb.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class GroupPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false)
    private String groupSequence;
    @NotBlank(message = "Please enter a title")
    private String title;
    private String body;
    private String status;
    private String acceptanceCriteria;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updated_At;
    @Column(updatable = false)
    private String groupIdentifier;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "backlog_id", updatable = false, nullable = false)
    @JsonIgnore
    private Backlog backlog;

    public Backlog getBacklog() {
        return backlog;
    }

    public void setBacklog(Backlog backlog) {
        this.backlog = backlog;
    }

    public GroupPost() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupSequence() {
        return groupSequence;
    }

    public void setGroupSequence(String groupSequence) {
        this.groupSequence = groupSequence;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAcceptanceCriteria() {
        return acceptanceCriteria;
    }

    public void setAcceptanceCriteria(String acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
    }

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

    public String getGroupIdentifier() {
        return groupIdentifier;
    }

    public void setGroupIdentifier(String groupIdentifier) {
        this.groupIdentifier = groupIdentifier;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }

    @Override
    public String toString() {
        return "GroupPost{" +
                "id=" + id +
                ", groupSequence='" + groupSequence + '\'' +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", status='" + status + '\'' +
                ", acceptanceCriteria='" + acceptanceCriteria + '\'' +
                ", created_At=" + created_At +
                ", dueDate=" + dueDate +
                ", updated_At=" + updated_At +
                ", groupIdentifier='" + groupIdentifier + '\'' +
                '}';
    }
}
