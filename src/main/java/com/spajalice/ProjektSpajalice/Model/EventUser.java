package com.spajalice.ProjektSpajalice.Model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class EventUser {

    private String userEmail;
    private Long eventId;
    @Enumerated(EnumType.STRING)
    private Interest interest;
}
