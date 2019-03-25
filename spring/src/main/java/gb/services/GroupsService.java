package gb.services;


import gb.domain.Groups;
import gb.exceptions.GroupIdException;
import gb.repositories.GroupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupsService {

    @Autowired
    private GroupsRepository groupsRepository;

    public Groups saveOrUpdateGroup(Groups groups){
        try{
            groups.setGroupIdentifier(groups.getGroupIdentifier().toUpperCase());
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
}
