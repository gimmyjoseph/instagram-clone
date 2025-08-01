package com.instagram.auth.login;

import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "users")
public class Login {
    private String identifier; // Can be phoneNumber, username, or email
    private String password;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}