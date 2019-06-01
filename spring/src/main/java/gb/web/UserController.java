package gb.web;

import gb.domain.FriendDTO;
import gb.domain.ProfileDTO;
import gb.domain.User;
import gb.payload.JWTLoginSucessResponce;
import gb.payload.LoginRequest;
import gb.security.JwtTokenProvider;
import gb.services.MapValidationErrorService;
import gb.services.UserService;
import gb.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

import static gb.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        User newUser = userService.saveUser(user);
        newUser.setConfirmPassword("");
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponce(true, jwt));
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfil(@PathVariable String username) {
        ProfileDTO profil = userService.getUserProfile(username);
        return new ResponseEntity<ProfileDTO>(profil, HttpStatus.OK);
    }

    @PostMapping("profile/edit/{username}")
    public ResponseEntity<?> editProfil(@PathVariable String username, @RequestBody ProfileDTO profil, Principal principal) {
        if (!username.equals(principal.getName())) return new ResponseEntity<String>("No no no", HttpStatus.FORBIDDEN);
        userService.saveUserProfile(principal.getName(), profil);
        return new ResponseEntity<ProfileDTO>(profil, HttpStatus.CREATED);
    }

    @GetMapping("/friends")
    public Iterable<FriendDTO> getFriends(Principal principal) {
        return userService.findFriends(principal.getName());
    }

    @PostMapping("/invite/{username}")
    public ResponseEntity<?> sendInvite(@PathVariable String username, Principal principal) {
        System.out.println(username);
        System.out.println(principal.getName());
        userService.sendInvites(username, principal.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/invite/accept/{username}")
    public ResponseEntity<?> acceptInv(@PathVariable String username, Principal principal) {
        userService.acceptInv(username, principal.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/invite/decline/{username}")
    public ResponseEntity<?> declineInv(@PathVariable String username, Principal principal) {
        userService.declineInv(username, principal.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/invite/view/sentInv")
    public Iterable<FriendDTO> getSentInvites(Principal principal) {
        return userService.findSentInvites(principal.getName());
    }

    @GetMapping("/invite/view/recInv")
    public Iterable<FriendDTO> getRecInvites(Principal principal) {
        return userService.findReceiveInvites(principal.getName());
    }
}
