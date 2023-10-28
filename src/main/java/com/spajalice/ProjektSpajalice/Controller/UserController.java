package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")


public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/userTest")
    public String test(){return "User radi";}


    @PostMapping("/addUser")
    public ResponseEntity<User> createTutorial(@RequestBody User user) {
        try {
            long userCount =userRepository.count();
            if(userCount==0) {
                user.setId(1L);
            }else{
                long nextId=userCount+1;
                user.setId(nextId);
            }
            User _user = userRepository.save(user);
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
