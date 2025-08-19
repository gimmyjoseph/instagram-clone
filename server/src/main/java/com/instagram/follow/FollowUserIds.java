package com.instagram.follow;


public class FollowUserIds {
    
    private String followUser;
    private String userName;
    public String getFollowUser() {
        return followUser;
    }
    public void setFollowUser(String followUser) {
        this.followUser = followUser;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public FollowUserIds(String followUser, String userName) {
        this.followUser = followUser;
        this.userName = userName;
    }
}