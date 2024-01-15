package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.*;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

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

    public User changePaymnetStatus(String userId){
        var user = userRepository.findById(userId).orElseThrow();
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime futureDate = currentDate.plus(1, ChronoUnit.MINUTES);
        user.setPaidUser(futureDate);
        return userRepository.save(user);
    }

    public Boolean checkPaymentStatus(String userId){
        var user = userRepository.findById(userId).orElseThrow();
        LocalDateTime currentDate = LocalDateTime.now();
        return currentDate.isBefore(user.getPaidUser());
    }

    public User changeVerifiedStatus(String userId){
        var user = userRepository.findById(userId).orElseThrow();
        user.setVerified(true);
        return userRepository.save(user);
    }

    public Boolean checkVerificationStatus(String userId){
        var user = userRepository.findById(userId).orElseThrow();
        return user.getVerified();
    }

    public List<Review> returnCommentList(User user) {
        List<Review> listForReturn = eventRepository.findByReviewsUserEmail(user.getEmail());
        return  listForReturn;
    }
}
