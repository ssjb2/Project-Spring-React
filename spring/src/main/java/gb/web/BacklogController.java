package gb.web;

import gb.domain.Backlog;
import gb.domain.Comment;
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
import java.security.Principal;
import java.util.List;

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
                                                    String backlog_id, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        GroupPost groupPost1 = groupPostService.addGroupPost(backlog_id, groupPost, principal.getName());

        return new ResponseEntity<GroupPost>(groupPost1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<GroupPost> getGroupBacklog(@PathVariable String backlog_id){
        return groupPostService.findBacklogById(backlog_id);
    }


    @GetMapping("/{backlog_id}/{gp_id}")
    public ResponseEntity<?> getGroupPost(@PathVariable String backlog_id, @PathVariable String gp_id){
        GroupPost groupPost = groupPostService.findGPByGroupSequnce(backlog_id, gp_id);
        return new ResponseEntity<GroupPost>(groupPost, HttpStatus.OK);
    }


    @PatchMapping("/{backlog_id}/{gp_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody GroupPost groupPost, BindingResult result,
                                               @PathVariable String backlog_id, @PathVariable String gp_id, Principal principal ){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        GroupPost updatedPost = groupPostService.updateByGroupSequence(groupPost,backlog_id,gp_id, principal.getName());

        return new ResponseEntity<GroupPost>(updatedPost,HttpStatus.OK);

    }
    @PostMapping("com/{gp_id}")
    public ResponseEntity<?> saveComment(@Valid @RequestBody Comment comment, BindingResult result, @PathVariable Long gp_id, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Comment comment1 = groupPostService.saveComment(comment,gp_id, principal.getName());
        return new ResponseEntity<Comment>(comment1, HttpStatus.CREATED);
    }
    @GetMapping("com/{post_id}")
    public Iterable<Comment> getComments(@PathVariable Long post_id){
        return groupPostService.findCommentById(post_id);

    }
}
