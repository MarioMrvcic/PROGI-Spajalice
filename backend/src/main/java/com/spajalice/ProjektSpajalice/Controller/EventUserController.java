package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Model.EventUser;
import com.spajalice.ProjektSpajalice.Model.Review;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Services.EventService;
import com.spajalice.ProjektSpajalice.Services.EventUserService;
import com.spajalice.ProjektSpajalice.Services.UserService;
import com.spajalice.ProjektSpajalice.auth.AuthenticationRequest;
import com.spajalice.ProjektSpajalice.auth.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")

public class EventUserController {

    @Autowired
    private EventUserService eventUserService;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    // mjenja status dolaska na event
    @PostMapping("/changeInterest")
    public ResponseEntity<Boolean> changeInterest(
            @RequestBody EventUser request
    ){
        try{
            if(userService.getUserById(request.getUserEmail().toString()).isPresent() && eventService.singleEventId(request.getEventId()).isPresent() && request.getInterest() != null){
                EventUser savedEventUser = eventUserService.saveEventUser(request);
            }
            else{
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // returns events that did not happen
    @GetMapping("/getEventsIntrestedIn/{email}")
    public ResponseEntity<List<Event>> getEventsIntrestedIn(@PathVariable String email){
        Optional<User> user = userService.getUserById(email);
        List<Event> returnAllEventsWithInterestForUser = new ArrayList<>();
        if (user.isPresent()) {
            returnAllEventsWithInterestForUser = eventUserService.returnAllEventsWithInterestForUser(user.get());
            return new ResponseEntity<>(returnAllEventsWithInterestForUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(returnAllEventsWithInterestForUser, HttpStatus.NOT_FOUND);
        }

    }

}
