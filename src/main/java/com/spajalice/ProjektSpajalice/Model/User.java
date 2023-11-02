package com.spajalice.ProjektSpajalice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Users")
public class User {
    @Id
    private Long id;
    private String username;
    private String name;
    private String email;
    private String address;
    private String websiteUrl;
    private String facebookUrl;
    private String password;
    private Role role;

    public User(String username, String name, String email, String address, String websiteUrl, String facebookUrl, String password, Role role) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.address = address;
        this.websiteUrl = websiteUrl;
        this.facebookUrl = facebookUrl;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getFacebookUrl() {
        return facebookUrl;
    }

    public void setFacebookUrl(String facebookUrl) {
        this.facebookUrl = facebookUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", websiteUrl='" + websiteUrl + '\'' +
                ", facebookUrl='" + facebookUrl + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}