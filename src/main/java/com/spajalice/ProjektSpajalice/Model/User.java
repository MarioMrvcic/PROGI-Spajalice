package com.spajalice.ProjektSpajalice.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Getter
    @Setter
    @Id
    private Long id;
    private String username;
    private String name;
    private String email;
    private String address;
    private String websiteUrl;
    private String facebookUrl;
    @Getter
    @Setter
    private String password;
    private Role role;

}