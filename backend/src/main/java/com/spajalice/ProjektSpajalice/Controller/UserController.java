package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.EventType;
import com.spajalice.ProjektSpajalice.Model.PlaceSimple;
import com.spajalice.ProjektSpajalice.Model.Review;
import com.spajalice.ProjektSpajalice.Model.User;

import com.spajalice.ProjektSpajalice.Services.UserService;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.events.Comment;
import java.util.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")

public class UserController {

    @Autowired
    private UserService userService;

    // test
    @GetMapping("/userTest")
    public String test() {
        return "User functionality is working";
    }

    // get all organisers
    @GetMapping("/organisers")
    public ResponseEntity<Optional<List<User>>> getAllOrganisers() {
        Optional<List<User>> organisers = userService.getAllOrganisers();
        if (organisers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(organisers, HttpStatus.OK);
    }

    // get all users
    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.allUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //get user by id
    @GetMapping("/getUser/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // delete user by id
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {
        Optional<User> userToDelete = userService.getUserById(userId);

        if (userToDelete.isPresent()) {
            userService.deleteUser(userId);
            return new ResponseEntity<>("User with ID " + userId + " deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with ID " + userId + " not found", HttpStatus.NOT_FOUND);
        }
    }

    // Return user interest types
    @GetMapping("/interestedInTypes/{email}")
    public ResponseEntity<?> getIntrestedInTypes(@PathVariable("email") String email) {
        try {
            List<EventType> interestedInTypes = userService.getIntrestedInTypesByEmail(email);
            return ResponseEntity.ok(interestedInTypes);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Return user interest places
    @GetMapping("/interestedInPlaces/{email}")
    public ResponseEntity<?> getIntrestedInPlaces(@PathVariable("email") String email) {
        try {
            List<PlaceSimple> interestedInPlaces = userService.getIntrestedInPlaceByEmail(email);
            return ResponseEntity.ok(interestedInPlaces);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // paying endpoint
    @PostMapping("/payment/{email}")
    public ResponseEntity<Boolean> paymentProcesing(@PathVariable String email) {
        double d = Math.random();
        if(d<0.85){
            try{
                User user = userService.changePaymnetStatus(email);
            }
            catch (Exception e){
                return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    // check if it is a paid user
    @GetMapping("/checkPaymentStatus/{email}")
    public ResponseEntity<Boolean> checkPaymentStatus(@PathVariable String email) {
        try{
            Boolean check = userService.checkPaymentStatus(email);

            return new ResponseEntity<>(check, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    // email verification
    @GetMapping("/verification/{email}")
    public ResponseEntity<String> emailVerificationProcesing(@PathVariable String email) {
        try{
            User user = userService.changeVerifiedStatus(email);
            return new ResponseEntity<>("Hvala vam na potvrdi, uspješnos te verificirani", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("Nešto je pošlo po krivu", HttpStatus.OK);
        }
    }

    // check if verified
    @GetMapping("/checkVerificationStatus/{email}")
    public ResponseEntity<Boolean> checkVerificationStatus(@PathVariable String email) {
        try{
            Boolean check = userService.checkVerificationStatus(email);
            return new ResponseEntity<>(check, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    // check if user exists
    @PostMapping("/usedEmail/{email}")
    public ResponseEntity<Boolean> usedEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserById(email);
        if (user.isPresent()) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    // return all user comments
    @GetMapping("/returnAllUserComments/{email}")
    public ResponseEntity<List<Review>> returnAllUserComments(@PathVariable String email){
        Optional<User> user = userService.getUserById(email);
        List<Review> returnCommentList = new ArrayList<>();
        if (user.isPresent()) {
            returnCommentList = userService.returnCommentList(user.get());
            return new ResponseEntity<>(returnCommentList, HttpStatus.OK);
        } else {

            return new ResponseEntity<>(returnCommentList, HttpStatus.NOT_FOUND);
        }
    }
}
