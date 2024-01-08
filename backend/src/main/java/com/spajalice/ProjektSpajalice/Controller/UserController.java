package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.User;

import com.spajalice.ProjektSpajalice.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")


public class UserController {

    @Autowired
    private UserService userService;

    //test
    @GetMapping("/userTest")
    public String test() {
        return "User functionality is working";
    }

    //get all organisers
    @GetMapping("/organisers")
    public ResponseEntity<Optional<List<User>>> getAllOrganisers() {
        Optional<List<User>> organisers = userService.getAllOrganisers();
        if (organisers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(organisers, HttpStatus.OK);
    }

    //get all users
    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.allUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    //delete user by id
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


}
