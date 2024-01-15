package com.spajalice.ProjektSpajalice.Model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("EventUser")
@Data
@Builder
public class EventUser {

    @Id
    private String Id;
    private String userEmail;
    private Long eventId;
    @Enumerated(EnumType.STRING)
    private Interest interest;
}
