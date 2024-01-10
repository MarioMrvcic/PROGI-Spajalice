package com.spajalice.ProjektSpajalice.auth;

import com.spajalice.ProjektSpajalice.Model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String websiteUrl;
    private String facebookUrl;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
}
