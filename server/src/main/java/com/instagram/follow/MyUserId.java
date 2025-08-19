package com.instagram.follow;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="following")
public class MyUserId {
    @Id
    private String userIds;
    private List<FollowUserIds> followUserIds;
    private List<PendingUserIds> pendingUserIds;

    
    public List<PendingUserIds> getPendingUserIds() {
        return pendingUserIds;
    }
    public void setPendingUserIds(List<PendingUserIds> pendingUserIds) {
        this.pendingUserIds = pendingUserIds;
    }
    public List<FollowUserIds> getFollowUserIds() {
        return followUserIds;
    }
    public void setFollowUserIds(List<FollowUserIds> followUserIds) {
        this.followUserIds = followUserIds;
    }
    public String getUserIds() {
        return userIds;
    }
    public void setUserIds(String userIds) {
        this.userIds = userIds;
    }
    

}