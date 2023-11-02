package com.spajalice.ProjektSpajalice.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("Events")
public class Event {

    @Id
    private Long id;

    private String eventName;
    private String eventType;

    private String eventLocation;
    private Date eventDate;
    private String eventStartTime;
    private String eventDuration;

    public Event(Long id, String eventName, String eventType, String eventLocation, Date eventDate, String  eventStartTime, String eventDuration) {
        super();
        this.id = id;
        this.eventName = eventName;
        this.eventType = eventType;
        this.eventLocation = eventLocation;
        this.eventDate = eventDate;
        this.eventStartTime = eventStartTime;
        this.eventDuration = eventDuration;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventStartTime() {
        return eventStartTime;
    }

    public void setEventStartTime(String eventStartTime) {
        this.eventStartTime = eventStartTime;
    }

    public String getEventDuration() {
        return eventDuration;
    }

    public void setEventDuration(String eventDuration) {
        this.eventDuration = eventDuration;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", eventType='" + eventType + '\'' +
                ", eventLocation='" + eventLocation + '\'' +
                ", eventDate=" + eventDate +
                ", eventStartTime='" + eventStartTime + '\'' +
                ", eventDuration='" + eventDuration + '\'' +
                '}';
    }
}

