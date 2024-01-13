package com.spajalice.ProjektSpajalice.auth;

import com.spajalice.ProjektSpajalice.Config.JwtService;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .address(request.getAddress())
                .websiteUrl(request.getWebsiteUrl())
                .facebookUrl(request.getFacebookUrl())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .paidUser(false)
                .build();
        userRepository.save(user);
        var jwtToken= jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse editProfile(EditProfileRequest request) {

        var existingUser = userRepository.findByEmail(request.getEmail()).orElseThrow();

        // Update the fields that need to be edited
        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setAddress(request.getAddress());
        existingUser.setWebsiteUrl(request.getWebsiteUrl());
        existingUser.setFacebookUrl(request.getFacebookUrl());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getRole() != null) {
            existingUser.setRole(request.getRole());
        }
        userRepository.save(existingUser);
        var jwtToken= jwtService.generateToken(existingUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken= jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .name(user.getFirstName())
                .role(user.getRole())
                .build();
    }

}
