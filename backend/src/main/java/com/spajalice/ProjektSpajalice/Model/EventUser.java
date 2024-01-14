package com.spajalice.ProjektSpajalice.Model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("EventUser")
@Data
@Builder
public class EventUser {

    private String userEmail;
    private Long eventId;
    @Enumerated(EnumType.STRING)
    private Interest interest;
}
