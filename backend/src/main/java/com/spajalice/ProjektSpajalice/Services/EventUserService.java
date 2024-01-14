package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.EventUser;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import com.spajalice.ProjektSpajalice.Repository.EventUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventUserService {

    @Autowired
    private EventUserRepository eventUserRepository;

    public EventUser saveEventUser(EventUser eventUser){ return eventUserRepository.save(eventUser);}

}
