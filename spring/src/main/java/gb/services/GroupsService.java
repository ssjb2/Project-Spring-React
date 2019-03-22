package gb.services;


import gb.domain.Groups;
import gb.repositories.GroupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupsService {

    @Autowired
    private GroupsRepository groupsRepository;

    public Groups saveOrUpdateGroup(Groups groups){
        return groupsRepository.save(groups);
    }
}
