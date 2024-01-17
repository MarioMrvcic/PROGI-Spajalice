package com.spajalice.ProjektSpajalice.auth;

public interface EmailSender {
    void send(String to, String email);

    void sendInterest(String to, String email);
}
