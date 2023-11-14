package com.spajalice.ProjektSpajalice.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
@Document("Events")
public class Event {

    @Id
    private Long _id;
    private String eventName;
    private EventType eventType;
    private Place eventLocationId;
    private Date eventDate;
    private LocalTime eventStartTime;
    private LocalTime eventDuration;
    private String description;
    private Double price;
    private List<Review> reviews;
    private List<Video>  videos;
    private List<Photo>  photos;
    private List<EventUser> peopleComing;

}

