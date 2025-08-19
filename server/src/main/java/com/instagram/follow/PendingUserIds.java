package com.instagram.follow;

public class PendingUserIds {
    private String userIdPendingForAccepting;
    private String userName;
    private String message;

    


    
    public PendingUserIds(String userIdPendingForAccepting, String userName, String message) {
        this.userIdPendingForAccepting = userIdPendingForAccepting;
        this.userName = userName;
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getUserIdPendingForAccepting() {
        return userIdPendingForAccepting;
    }
    public void setUserIdPendingForAccepting(String userIdPendingForAccepting) {
        this.userIdPendingForAccepting = userIdPendingForAccepting;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
}