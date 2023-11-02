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
        return eventRepository.findById(id);
    }

    public Optional<List<Event>> getEventsByLocation(String eventLocation){
        return eventRepository.findByEventLocation(eventLocation);
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


}
