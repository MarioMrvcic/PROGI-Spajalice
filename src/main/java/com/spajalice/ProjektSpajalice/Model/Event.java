package com.spajalice.ProjektSpajalice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Events")
public class Event {

    @Id
    private Integer id;

    private String eventName;

    public Event(Integer id, String name) {
        super();
        this.id = id;
        this.eventName = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
}

