package gb.web;

import gb.domain.Backlog;
import gb.domain.GroupPost;
import gb.repositories.BacklogRepository;
import gb.repositories.GroupPostRepository;
import gb.services.GroupPostService;
import gb.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private GroupPostService groupPostService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addGroupPostToBacklog(@Valid @RequestBody GroupPost groupPost, BindingResult result, @PathVariable
                                                    String backlog_id){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        GroupPost groupPost1 = groupPostService.addGroupPost(backlog_id, groupPost);

        return new ResponseEntity<GroupPost>(groupPost1, HttpStatus.CREATED);
    }
}
