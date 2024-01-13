package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("PlacesSimple")
public class PlaceSimple {

    @Id
    private ObjectId _Id;

    private String Name;

}
