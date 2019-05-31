package gb.services;


import gb.domain.ProfileDTO;
import gb.domain.User;
import gb.exceptions.UsernameAlreadyExistsException;
import gb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            if(newUser.getLogo()==null){
            newUser.setLogo("https://i.pinimg.com/236x/09/94/5f/09945fe83c94669cd0cfcddce4bae788--facebook-profile-avatar.jpg");}
            return userRepository.save(newUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("User with this username already exists");
        }
    }

    public User findUsrByUsername(String username){
        User user = userRepository.findByUsername(username);
        return user;
    }
    public ProfileDTO getUserProfile(String username) {
        try {
            User user = userRepository.findByUsername(username);
            ProfileDTO profil = new ProfileDTO();
            profil.setId(user.getId());
            profil.setUsername(user.getUsername());
            profil.setAbout(user.getAbout());
            profil.setAge(user.getAge());
            profil.setGames(user.getGames());
            profil.setLogo(user.getLogo());
            profil.setHobbies(user.getHobbies());
            return profil;
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("User does not exist");
        }

    }

    public void saveUserProfile(String username, ProfileDTO profil){
        User user = findUsrByUsername(username);
        user.setAbout(profil.getAbout());
        System.out.println(user.getLogo());
        System.out.println(profil.getLogo());
        user.setLogo(profil.getLogo());
        System.out.println(user.getLogo());
        if(user.getLogo()==null){
            user.setLogo("https://i.pinimg.com/236x/09/94/5f/09945fe83c94669cd0cfcddce4bae788--facebook-profile-avatar.jpg");
        }
        System.out.println(user.getLogo()+"4");
        user.setGames(profil.getGames());
        user.setHobbies(profil.getHobbies());
        user.setAge(profil.getAge());
        saveUser(user);
     }
}
