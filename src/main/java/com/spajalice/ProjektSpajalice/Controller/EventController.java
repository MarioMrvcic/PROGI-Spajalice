package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import com.spajalice.ProjektSpajalice.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    EventRepository eventRepository;
    @Autowired
    private EventService eventService;

    @GetMapping("/eventTest")
    public String test() {
        return "Event radi";
    }

    @PostMapping("/addEvent")
    public ResponseEntity<Event> createTutorial(@RequestBody Event event) {
        try {
            long eventCount = eventRepository.count();
            if(eventCount==0){
                event.setId(1L);
            }else{
                long nextId=eventCount+1;
                event.setId(nextId);
            }
            Event _event = eventRepository.save(event);
            return new ResponseEntity<>(_event, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getAllEvents(){
        return new ResponseEntity<List<Event>>(eventService.allEvents(),HttpStatus.OK);
    }

    @GetMapping("/Event/{id}")
    public ResponseEntity<Optional<Event>> getSingleEvent(@PathVariable Long id){
        return new ResponseEntity<Optional<Event>>(eventService.singleEventId(id),HttpStatus.OK);
    }

    @GetMapping("/Events/Location/{eventLocation}")
    public ResponseEntity<Optional<List<Event>>> getEventsByLocation(@PathVariable String eventLocation){
        Optional<List<Event>> events =eventService.getEventsByLocation(eventLocation);
        if(events.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/Events/next24hours")
    public ResponseEntity<Optional<List<Event>>> getEventsNext24Hours(){
        return new ResponseEntity<>(eventService.eventsNext24Hours(),HttpStatus.OK);
    }

    @GetMapping("/Events/next7days")
    public ResponseEntity<Optional<List<Event>>> getEventsNext7Days(){
        return new ResponseEntity<>(eventService.eventsNext7Days(),HttpStatus.OK);
    }

    @GetMapping("/Events/next30days")
    public ResponseEntity<Optional<List<Event>>> getEventsNext30Days(){
        return new ResponseEntity<>(eventService.eventsNext30days(),HttpStatus.OK);
    }


}
