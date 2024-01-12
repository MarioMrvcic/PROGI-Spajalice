package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Model.EventUser;
import com.spajalice.ProjektSpajalice.Services.EventService;
import com.spajalice.ProjektSpajalice.Services.EventUserService;
import com.spajalice.ProjektSpajalice.Services.UserService;
import com.spajalice.ProjektSpajalice.auth.AuthenticationRequest;
import com.spajalice.ProjektSpajalice.auth.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
