 
package com.instagram.follows;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="follow")
public class Follow {
    @Id
    private String Id;
    private String followerId;
    private String followingId;
     public String getId() {
         return Id;
     }
    
    
    public void setId(String id) {
        Id = id;
    }
    public String getFollowerId() {
        return followerId;
    }
    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }
    public String getFollowingId() {
        return followingId;
    }
    public void setFollowingId(String followingId) {
        this.followingId = followingId;
    }

    
}
