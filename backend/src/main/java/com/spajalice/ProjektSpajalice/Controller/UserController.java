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
