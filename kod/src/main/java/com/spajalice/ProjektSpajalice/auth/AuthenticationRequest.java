package com.spajalice.ProjektSpajalice.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {

    private String email;

    String password;
}
