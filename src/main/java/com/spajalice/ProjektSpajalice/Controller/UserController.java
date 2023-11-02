package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
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
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    UserService userService;

    @GetMapping("/userTest")
    public String test(){return "User radi";}

    @PostMapping("/registerUser")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        try{
            long userCount= userRepository.count();
            if(userCount==0){
                user.setId(1L);
            }else{
                long nextId=userCount+1;
                user.setId(nextId);
            }
            user.setPassword((bCryptPasswordEncoder.encode(user.getPassword())));
            User _user =userRepository.save(user);
            return new ResponseEntity<>(_user,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/organisers")
    public ResponseEntity<Optional<List<User>>> getAllOrganisers(){
        Optional<List<User>> organisers = userService.getAllOrganisers();
        return new ResponseEntity<>(organisers,HttpStatus.OK);
    }

}
