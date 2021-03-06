package gb.services;


import gb.domain.Backlog;
import gb.domain.Groups;
import gb.domain.User;
import gb.exceptions.GroupIdException;
import gb.repositories.BacklogRepository;
import gb.repositories.GroupsRepository;
import gb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupsService {

    @Autowired
    private GroupsRepository groupsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BacklogRepository backlogRepository;
    public Groups saveOrUpdateGroup(Groups groups, String username){
        try{
            groups.setGroupIdentifier(groups.getGroupIdentifier().toUpperCase());
            if(groups.getId()==null){
                Backlog backlog = new Backlog();
                groups.setBacklog(backlog);
                backlog.setGroup(groups);
                backlog.setGroupIdentifier(groups.getGroupIdentifier().toUpperCase());
                if(groups.getCountUsers()==null){
                    groups.setCountUsers(0);
                }
            }
            if(groups.getId()!=null){
                groups.setBacklog(backlogRepository.findByGroupIdentifier(groups.getGroupIdentifier().toUpperCase()));
            }
            return groupsRepository.save(groups);
        }catch (Exception e){
            throw new GroupIdException("Group ID '"+groups.getGroupIdentifier().toUpperCase()+"' already exists");
        }

    }


    public Groups findGroupByIdentifier(String groupId){
        Groups groups = groupsRepository.findByGroupIdentifier(groupId);
        if(groups==null){
            throw new GroupIdException("Group ID '"+groupId+"' does not exists");
        }
        return groups;
    }

    public Iterable<Groups> findAllGroups(){
        return groupsRepository.findAll();
    }

    public void deleteGroupById(String groupId){
        Groups groups = groupsRepository.findByGroupIdentifier(groupId.toUpperCase());
        if(groups==null){
            throw new GroupIdException("Cannot delete group with ID '"+groupId+"'. This group does not exist");
        }
        groupsRepository.delete(groups);
    }

    public void joinGroup(String groupId, String username){
        Groups groups = groupsRepository.findByGroupIdentifier(groupId.toUpperCase());



            if(groups==null){
            throw new GroupIdException("Cannot delete group with ID '"+groupId+"'. This group does not exist");
        }
        User user = userRepository.findByUsername(username);
        if(groups.getUsersInGroup().contains(user)) throw new GroupIdException("You are already in this group '"+groupId+"'")   ;
        groups.addMember(user);
        groups.setCountUsers(groups.getCountUsers()+1);
        groupsRepository.save(groups);

    }


}
