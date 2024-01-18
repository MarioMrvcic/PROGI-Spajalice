package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.*;
import com.spajalice.ProjektSpajalice.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/eventTest")
    public String test() {
        return "Event radi";
    }

    /**
     * Endpoint to create a new event.
     *
     * @param event The event to be created.
     * @return ResponseEntity with the created event or an error status.
     */
    @PostMapping("/addEvent")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        try {
            // Add the event to the system
            Event _event = eventService.addEvent(event);

            // Send emails
            List<User> returnList = eventService.sendEmailToIntrested(event.getEventType(), event.getEventLocation(), event.getEventName());

            // Return the created event
            return new ResponseEntity<>(_event, HttpStatus.CREATED);
        } catch (Exception e) {
            // Return an error response in case of an exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/testMail")
    public ResponseEntity<List<User>> testMail(@RequestBody PlaceTypeRequest placeTypeRequest) {
        try {
            List<User> returnList = eventService.sendEmailToIntrested(placeTypeRequest.getType(), placeTypeRequest.getPlace(), "Test, event ne postoji");
            return new ResponseEntity<>(returnList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/editEvent")
    public ResponseEntity<Event> editEvent(@RequestBody Event event) {
        try {
            // Add the event to the system
            Event _event = eventService.editEvent(event);

            // Return the created event
            return new ResponseEntity<>(_event, HttpStatus.CREATED);
        } catch (Exception e) {
            // Return an error response in case of an exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to delete an event and its associated reviews.
     *
     * @param eventId The ID of the event to be deleted.
     * @return ResponseEntity with a success message or an error status.
     */
    @PostMapping("/deleteEvent/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long eventId) {
        // Delete the event and its reviews
        eventService.deleteEventAndReviews(eventId);
        return new ResponseEntity<>("Event and associated reviews deleted successfully", HttpStatus.OK);
    }

    /**
     * Endpoint to get a list of all events.
     *
     * @return ResponseEntity with the list of events or a not found status if the list is empty.
     */
    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.allEvents();
        if (events.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /**
     * Endpoint to get a single event by its ID.
     *
     * @param id The ID of the event.
     * @return ResponseEntity with the optional containing the event or a not found status if not present.
     */
    @GetMapping("/Event/{id}")
    public ResponseEntity<Optional<Event>> getSingleEvent(@PathVariable Long id) {
        Optional<Event> event = eventService.singleEventId(id);
        if (event.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    /**
     * Endpoint to get events occurring in the next 24 hours.
     *
     * @return ResponseEntity with the optional containing the list of events or a not found status if not present.
     */
    @GetMapping("/Events/next24hours")
    public ResponseEntity<Optional<List<Event>>> getEventsNext24Hours() {
        return new ResponseEntity<>(eventService.eventsNext24Hours(), HttpStatus.OK);
    }

    /**
     * Endpoint to get events occurring in the next 7 days.
     *
     * @return ResponseEntity with the optional containing the list of events or a not found status if not present.
     */
    @GetMapping("/Events/next7days")
    public ResponseEntity<Optional<List<Event>>> getEventsNext7Days() {
        return new ResponseEntity<>(eventService.eventsNext7Days(), HttpStatus.OK);
    }

    /**
     * Endpoint to get events occurring in the next 30 days.
     *
     * @return ResponseEntity with the optional containing the list of events or a not found status if not present.
     */
    @GetMapping("/Events/next30days")
    public ResponseEntity<Optional<List<Event>>> getEventsNext30Days() {
        return new ResponseEntity<>(eventService.eventsNext30days(), HttpStatus.OK);
    }

    @GetMapping("/eventTypes")
    public EventType[] getEventTypes(){
    return EventType.values();
    }

}
