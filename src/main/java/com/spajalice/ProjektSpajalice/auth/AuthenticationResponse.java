package com.spajalice.ProjektSpajalice.auth;
import com.spajalice.ProjektSpajalice.Model.Role;



import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {

    private String token;

    private String name;

    private Role role;
}
