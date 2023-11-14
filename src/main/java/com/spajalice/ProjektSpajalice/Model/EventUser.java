package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
public class EventUser {
    private Long userId;
    private Interest interest;
}
