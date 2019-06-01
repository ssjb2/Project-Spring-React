package gb.services;


import gb.domain.FriendDTO;
import gb.domain.ProfileDTO;
import gb.domain.User;
import gb.exceptions.UsernameAlreadyExistsException;
import gb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            if (newUser.getLogo() == null) {
                newUser.setLogo("https://i.pinimg.com/236x/09/94/5f/09945fe83c94669cd0cfcddce4bae788--facebook-profile-avatar.jpg");
            }
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("User with this username already exists");
        }
    }

    public User findUsrByUsername(String username) {
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

    public void saveUserProfile(String username, ProfileDTO profil) {
        User user = findUsrByUsername(username);
        user.setAbout(profil.getAbout());
        System.out.println(user.getLogo());
        System.out.println(profil.getLogo());
        user.setLogo(profil.getLogo());
        System.out.println(user.getLogo());
        if (user.getLogo() == null) {
            user.setLogo("https://i.pinimg.com/236x/09/94/5f/09945fe83c94669cd0cfcddce4bae788--facebook-profile-avatar.jpg");
        }
        System.out.println(user.getLogo() + "4");
        user.setGames(profil.getGames());
        user.setHobbies(profil.getHobbies());
        user.setAge(profil.getAge());
        saveUser(user);
    }

    public Iterable<FriendDTO> findFriends(String name) {
        User user = userRepository.findByUsername(name);
        System.out.println(name);
        FriendDTO friendDTO = new FriendDTO();
        friendDTO.setId(user.getId());
        friendDTO.setUsername(user.getUsername());
        List l =user.getFriends();
        List<FriendDTO>list= new ArrayList<>();
        int i=0;
        System.out.println(l.size());
        while(i<l.size()){
            FriendDTO friendDTO1 = new FriendDTO();
            User user1 = (User) l.get(i);
            friendDTO1.setId(user1.getId());
            friendDTO1.setUsername(user1.getUsername());
            list.add(friendDTO1);
            System.out.println(user1.getUsername());
            i++;
        }
        friendDTO.setFriends(list);
        return friendDTO.getFriends();
    }

    public void sendInvites(String username, String name) {
        User sender = userRepository.findByUsername(name);
        User receiver = userRepository.findByUsername(username);
        sender.sendInv(receiver);
        receiver.receiveInv(sender);
        userRepository.save(sender);
        userRepository.save(receiver);
    }

    public void acceptInv(String username, String name) {
        User receiver = userRepository.findByUsername(name);
        User sender = userRepository.findByUsername(username);
        sender.addFriend(receiver);
        receiver.addFriend(sender);
        sender.removesSendedInv(receiver);
        receiver.removeReceivedInv(sender);
        userRepository.save(sender);
        userRepository.save(receiver);
    }


    public void declineInv(String username, String name) {
        User receiver = userRepository.findByUsername(name);
        User sender = userRepository.findByUsername(username);
        sender.removesSendedInv(receiver);
        receiver.removeReceivedInv(sender);
        userRepository.save(sender);
        userRepository.save(receiver);
    }

    public Iterable<FriendDTO> findSentInvites(String name) {
        User user = userRepository.findByUsername(name);
        System.out.println(name);
        FriendDTO friendDTO = new FriendDTO();
        friendDTO.setId(user.getId());
        friendDTO.setUsername(user.getUsername());
        List l =user.getSendInvites();
        List<FriendDTO>list= new ArrayList<>();
        int i=0;
        System.out.println(l.size());
        while(i<l.size()){
            FriendDTO friendDTO1 = new FriendDTO();
            User user1 = (User) l.get(i);
            friendDTO1.setId(user1.getId());
            friendDTO1.setUsername(user1.getUsername());
            list.add(friendDTO1);
            System.out.println(user1.getUsername());
            i++;
        }
        friendDTO.setSendInvites(list);
        return friendDTO.getSendInvites();
    }
    public Iterable<FriendDTO> findReceiveInvites(String name) {
        User user = userRepository.findByUsername(name);
        System.out.println(name);
        FriendDTO friendDTO = new FriendDTO();
        friendDTO.setId(user.getId());
        friendDTO.setUsername(user.getUsername());
        List l =user.getReceiveInvites();
        List<FriendDTO>list= new ArrayList<>();
        int i=0;
        System.out.println(l.size());
        while(i<l.size()){
            FriendDTO friendDTO1 = new FriendDTO();
            User user1 = (User) l.get(i);
            friendDTO1.setId(user1.getId());
            friendDTO1.setUsername(user1.getUsername());
            list.add(friendDTO1);
            System.out.println(user1.getUsername());
            i++;
        }
        friendDTO.setReceiveInvites(list);
        return friendDTO.getReceiveInvites();
    }
}