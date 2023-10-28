package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping("/eventTest")
    public String test() {
        return "Event radi";
    }

    @PostMapping("/addEvent")
    public ResponseEntity<Event> createTutorial(@RequestBody Event event) {
        try {
            Event _event = eventRepository.save(new Event(event.getId(),
                    event.getEventName(),
                    event.getEventType(),
                    event.getEventLocation(),
                    event.getEventDate(),
                    event.getEventStartTime(),
                    event.getEventDuration()));
            return new ResponseEntity<>(_event, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
