package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.User;

import com.spajalice.ProjektSpajalice.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")


public class UserController {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserService userService;

    /**
     * Endpoint for testing user functionality.
     *
     * @return A string indicating that user functionality is working.
     */
    @GetMapping("/userTest")
    public String test() {
        return "User functionality is working";
    }

    /**
     * Endpoint to register a new user.
     *
     * @param user The user to be registered.
     * @return ResponseEntity with the registered user or an error status.
     */
    @PostMapping("/registerUser")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            // Generate a unique ID for the user
            long userCount = userService.userCount();
            if (userCount == 0) {
                user.setId(1L);
            } else {
                long nextId = userCount + 1;
                user.setId(nextId);
            }

            // Encrypt the user's password before saving
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            // Save the user to the system
            User _user = userService.saveUser(user);

            // Return the registered user
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            // Return an error response in case of an exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to get all organisers.
     *
     * @return ResponseEntity with the optional containing the list of organisers or a not found status if not present.
     */
    @GetMapping("/organisers")
    public ResponseEntity<Optional<List<User>>> getAllOrganisers() {
        Optional<List<User>> organisers = userService.getAllOrganisers();
        if (organisers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(organisers, HttpStatus.OK);
    }

}
