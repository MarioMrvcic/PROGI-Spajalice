package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> allEvents(){
        return eventRepository.findAll();
    }

    public Optional<Event> singleEventId(Long id){
        return eventRepository.findBy_id(id);
    }

    public Optional<List<Event>> eventsNext24Hours(){
        Date currentDate =new Date();
        Date next24Hours = new Date(currentDate.getTime()+(24*60*60*1000));
        return eventRepository.findByEventDateBetween(currentDate,next24Hours);
    }

    public Optional<List<Event>> eventsNext7Days(){
        Date currentDate =new Date();
        Date next7Days = new Date(currentDate.getTime()+(7*24*60*60*1000));
        return eventRepository.findByEventDateBetween(currentDate,next7Days);
    }

    public Optional<List<Event>> eventsNext30days(){
        Date currentDate =new Date();
        Date next30Days = new Date(currentDate.getTime()+(30L *24*60*60*1000));
        return eventRepository.findByEventDateBetween(currentDate,next30Days);
    }

    public long eventCount(){
        return eventRepository.count();
    }
    
    public Event addEvent(Event event){
        long count=eventRepository.count();
        event.set_id(count+1);
        return eventRepository.save(event);
    }

    /**
     * Deletes an event and its associated reviews.
     *
     * @param eventId The ID of the event to be deleted.
     */
    public void deleteEventAndReviews(Long eventId) {
        // Retrieve the event by its ID
        Optional<Event> optionalEvent = eventRepository.findById(eventId);

        // Check if the event exists
        if (optionalEvent.isPresent()) {
            // Get the event from the optional
            Event event = optionalEvent.get();

            // Delete the event itself
            eventRepository.deleteById(eventId);
        }
    }
}
