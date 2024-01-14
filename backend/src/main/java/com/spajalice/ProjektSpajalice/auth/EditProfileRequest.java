package com.spajalice.ProjektSpajalice.auth;

import com.spajalice.ProjektSpajalice.Model.EventType;
import com.spajalice.ProjektSpajalice.Model.PlaceSimple;
import com.spajalice.ProjektSpajalice.Model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class EditProfileRequest {

    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String websiteUrl;
    private String facebookUrl;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private List<EventType> intrestedInTypes;
    private List<PlaceSimple> intrestedInPlace;
}
