package com.instagram.auth.login.token;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.instagram.config.ObjectIdSerializer;

@Document(collection = "user_tokens")
public class UserToken {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String email;
    private String userId;
    private List<UserTokenEntry> tokens;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<UserTokenEntry> getTokens() {
        return tokens;
    }

    public void setTokens(List<UserTokenEntry> tokens) {
        this.tokens = tokens;
    }
}