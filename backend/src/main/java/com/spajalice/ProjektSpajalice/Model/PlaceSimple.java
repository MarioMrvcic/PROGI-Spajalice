package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("PlacesSimple")
public class PlaceSimple {
    private String Name;
}
