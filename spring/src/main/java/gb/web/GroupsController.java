package gb.web;

import gb.domain.Groups;
import gb.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import gb.services.GroupsService;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin
public class GroupsController {

    @Autowired
    GroupsService groupsService;
    @Autowired
    private MapValidationErrorService mapValidationErrorServicel;

    @PostMapping("")
    public ResponseEntity<?> createNewGroup(@Valid @RequestBody Groups groups, BindingResult result, Principal principal){

        ResponseEntity<?>errorMap = mapValidationErrorServicel.MapValidationService(result);
        if(errorMap!=null)return errorMap;

        Groups groups1 = groupsService.saveOrUpdateGroup(groups, principal.getName());
        return new ResponseEntity<Groups>(groups1,HttpStatus.CREATED);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<?> getGroupById(@PathVariable String groupId){
        Groups groups = groupsService.findGroupByIdentifier(groupId);
        return new ResponseEntity<Groups>(groups, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Groups> getAllGroups(){
        return groupsService.findAllGroups();
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable String groupId){
        groupsService.deleteGroupById(groupId);
        return new ResponseEntity<String>("Group with Id'" +groupId+"'was deleted", HttpStatus.OK);
    }
    @PostMapping("/join/{groupId}")
    public ResponseEntity<?> joinGroup(@PathVariable String groupId, Principal principal){

        String usrname = principal.getName();
        groupsService.joinGroup(groupId, usrname);

        return new ResponseEntity<String>("Joined", HttpStatus.OK);
    }
    @GetMapping("/join/_count?{groupId}")
    public ResponseEntity<?> countGroup(@PathVariable String groupId, Principal principal){

        String usrname = principal.getName();
        groupsService.joinGroup(groupId, usrname);

        return new ResponseEntity<String>("Joined", HttpStatus.OK);
    }



}
