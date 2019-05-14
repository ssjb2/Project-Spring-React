package gb.services;

import gb.domain.Backlog;
import gb.domain.GroupPost;
import gb.domain.Groups;
import gb.exceptions.GroupNotFoundException;
import gb.repositories.BacklogRepository;
import gb.repositories.GroupPostRepository;
import gb.repositories.GroupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;

@Service
public class GroupPostService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private GroupPostRepository groupPostRepository;

    @Autowired
    private GroupsRepository groupsRepository;


    public GroupPost addGroupPost(String groupIdentifier, GroupPost groupPost) {
        try {
            Backlog backlog = backlogRepository.findByGroupIdentifier(groupIdentifier);
            groupPost.setBacklog(backlog);
            Integer BacklogSequence = backlog.getGPSequence();
            BacklogSequence++;
            backlog.setGPSequence(BacklogSequence);
            groupPost.setGroupSequence(groupIdentifier + "-" + BacklogSequence);
            groupPost.setGroupIdentifier(groupIdentifier);

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
}