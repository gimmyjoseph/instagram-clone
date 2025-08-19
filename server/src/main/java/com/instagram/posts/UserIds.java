package com.instagram.posts;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="posts")
public class UserIds {
    
    @Id
    private String userId;
    private List<Posts> posts;
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public List<Posts> getPosts() {
        return posts;
    }
    public void setPosts(List<Posts> posts) {
        this.posts = posts;
    }
}