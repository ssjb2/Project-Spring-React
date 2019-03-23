package gb.web;

import gb.domain.Groups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import gb.services.GroupsService;

@RestController
@RequestMapping("/api/groups")
public class GroupsController {

    @Autowired
    GroupsService groupsService;

    @PostMapping("")
    public ResponseEntity<Groups> createNewGroup(@RequestBody Groups groups){
        Groups groups1 = groupsService.saveOrUpdateGroup(groups);
        return new ResponseEntity<Groups>(groups1,HttpStatus.CREATED);
    }
}
