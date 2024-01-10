package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.EventType;
import com.spajalice.ProjektSpajalice.Model.PlaceSimple;
import com.spajalice.ProjektSpajalice.Model.Role;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> allUsers(){
        return userRepository.findAll();
    }
    public Optional<List<User>> getAllOrganisers(){
        return userRepository.findByRole(Role.ORGANIZER);
    }

    public long userCount(){ return userRepository.count();}

    public User saveUser(User user){ return userRepository.save(user);}

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    // Method to get intrestedInTypes by user email
    public List<EventType> getIntrestedInTypesByEmail(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        if (user.getIntrestedInTypes() != null) {
            return user.getIntrestedInTypes().stream().toList();
        } else {
            return Collections.emptyList(); // Return an empty list if no interests are found
        }
    }

    public List<PlaceSimple> getIntrestedInPlaceByEmail(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        if (user.getIntrestedInPlace() != null) {
            return user.getIntrestedInPlace().stream().toList();
        } else {
            return Collections.emptyList(); // Return an empty list if no interests are found
        }
    }
}
