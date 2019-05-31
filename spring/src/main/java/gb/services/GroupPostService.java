package gb.services;

import gb.domain.*;
import gb.exceptions.GroupNotFoundException;
import gb.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupPostService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private GroupPostRepository groupPostRepository;

    @Autowired
    private GroupsRepository groupsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;


    public GroupPost addGroupPost(String groupIdentifier, GroupPost groupPost, String name) {
        try {
            Backlog backlog = backlogRepository.findByGroupIdentifier(groupIdentifier);
            groupPost.setBacklog(backlog);
            Integer BacklogSequence = backlog.getGPSequence();
            BacklogSequence++;
            backlog.setGPSequence(BacklogSequence);
            groupPost.setGroupSequence(groupIdentifier + "-" + BacklogSequence);
            groupPost.setGroupIdentifier(groupIdentifier);

            User user= userRepository.findByUsername(name);
            if(groupPost.getAuthor()==null){
            groupPost.setAuthor(user);}
            if (groupPost.getStatus() == "" || groupPost.getStatus() == null) {
                groupPost.setStatus("ACTIVE");
            }

            return groupPostRepository.save(groupPost);
        } catch (
                Exception e) {
            throw new GroupNotFoundException("Group not found");
        }
    }

    public Iterable<GroupPost> findBacklogById(String id) {
        Groups group = groupsRepository.findByGroupIdentifier(id);
        if (group == null) {
            throw new GroupNotFoundException("Group with id:'" + id + "' does not exist");
        }
        return groupPostRepository.findByGroupIdentifier(id);

    }

    public GroupPost findGPByGroupSequnce(String backlog_id, String gp_id) {
        return groupPostRepository.findByGroupSequence(gp_id);
    }

    public GroupPost updateByGroupSequence(GroupPost uupdatedPost, String backlog_id, String pt_id, String name) {
        GroupPost groupPost = findGPByGroupSequnce(backlog_id,pt_id);
User user = userRepository.findByUsername(name);
        groupPost = uupdatedPost;
        groupPost.setAuthor(user);
        return groupPostRepository.save(groupPost);
    }

    public Comment saveComment(Comment comment,Long gp_id, String name){
        Optional<GroupPost> groupPost = groupPostRepository.findById(gp_id);
        User user = userRepository.findByUsername(name);
        comment.setAuthor(user);
        comment.setPost(groupPost.get());
        return commentRepository.save(comment);

    }

    public Iterable<Comment> findCommentById(Long post_id) {
        return commentRepository.findByPostId(post_id);
    }
}