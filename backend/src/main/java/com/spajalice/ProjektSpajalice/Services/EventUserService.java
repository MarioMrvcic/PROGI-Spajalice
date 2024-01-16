package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Model.EventUser;
import com.spajalice.ProjektSpajalice.Model.Interest;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import com.spajalice.ProjektSpajalice.Repository.EventUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class EventUserService {

    @Autowired
    private EventUserRepository eventUserRepository;

    @Autowired EventRepository eventRepository;


    public EventUser saveEventUser(EventUser eventUser) {// Check if an EventUser with the same eventId and userEmail exists
        try{
            EventUser existingEventUser = eventUserRepository.findByEventIdAndUserEmail(
                    eventUser.getEventId(), eventUser.getUserEmail()).orElseThrow();
            existingEventUser.setInterest(eventUser.getInterest());
            boolean deleted = eventUserRepository.deleteByEventIdAndUserEmail(eventUser.getEventId(), eventUser.getUserEmail());
            if(deleted){
                return eventUserRepository.save(existingEventUser);
            }
            else{
                throw new RuntimeException("Neuspjesan delete");
            }
        } catch (Exception e){
            return eventUserRepository.save(eventUser);
        }
    }

    public List<Event> returnAllEventsWithInterestForUser(User user) {
        List<Event> eventListForReturn = new ArrayList<>();

        List<EventUser> eventUsersWithInterest = eventUserRepository.findAllByInterestInAndUserEmail(List.of(Interest.MAYBE, Interest.YES), user.getEmail());

        for (EventUser e : eventUsersWithInterest){
            Optional<Event> eventToAdd = eventRepository.findBy_id(e.getEventId());
            if(eventToAdd.isPresent()){
                eventListForReturn.add(eventToAdd.get());
            }
        }

        return eventListForReturn;
    }


    public List<EventUser> returnEventInterest(User user) {

        return eventUserRepository.findAllByUserEmail(user.getEmail());

    }
}
