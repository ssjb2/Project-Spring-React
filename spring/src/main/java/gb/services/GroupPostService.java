package gb.services;

import gb.domain.Backlog;
import gb.domain.GroupPost;
import gb.repositories.BacklogRepository;
import gb.repositories.GroupPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;

@Service
public class GroupPostService {

    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private GroupPostRepository groupPostRepository;

    public GroupPost addGroupPost(String groupIdentifier, GroupPost groupPost) {

        Backlog backlog = backlogRepository.findByGroupIdentifier(groupIdentifier);
        groupPost.setBacklog(backlog);
        Integer BacklogSequence = backlog.getGPSequence();
        BacklogSequence++;
        backlog.setGPSequence(BacklogSequence);
        groupPost.setGroupSequence(groupIdentifier + "-" + BacklogSequence);
        groupPost.setGroupIdentifier(groupIdentifier);

        if(groupPost.getStatus()==""|| groupPost.getStatus()==null){
            groupPost.setStatus("ACTIVE");
        }
    return groupPostRepository.save(groupPost);}
}
