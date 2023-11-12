package com.spajalice.ProjektSpajalice.Model;


import jakarta.persistence.CascadeType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;

@Document("Events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Setter
    @Getter
    @Id
    private Long id;
    private String eventName;
    private String eventType;
    private String eventLocation;
    private Date eventDate;
    private String eventStartTime;
    private String eventDuration;
    @DocumentReference
    private List<Review> reviewIds;

}

