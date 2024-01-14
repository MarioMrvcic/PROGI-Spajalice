package com.spajalice.ProjektSpajalice.Model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document("Users")
@Data
@Builder
public class User implements UserDetails {

    @Id
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String websiteUrl;
    private String facebookUrl;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime paidUser;
    private Boolean verified;
    private List<EventType> intrestedInTypes;
    private List<PlaceSimple> intrestedInPlace;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername(){
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}