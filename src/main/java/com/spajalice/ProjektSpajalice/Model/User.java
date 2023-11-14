package com.spajalice.ProjektSpajalice.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Users")
@Data
public class User {

    @Id
    private Long _id;
    private String username;
    private String name;
    private String email;
    private String address;
    private String websiteUrl;
    private String facebookUrl;
    private String password;
    private Role role;
    private List<Long> intrestedInPlaces;
    private List<EventType> intrestedInTypes;

}