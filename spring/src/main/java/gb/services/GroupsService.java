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
}
