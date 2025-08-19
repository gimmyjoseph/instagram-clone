package com.instagram.posts;


import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
// import com.instagram.likes.ike.Like;


public class Posts {
    
    @Id
    private ObjectId postId;
   
    private String description;
    private List likes;

    // private List<Comment> comments;
    
    public List getLikes() {
        return likes;
    }
    public void setLikes(List likes) {
        this.likes = likes;
    }
    
    public ObjectId getPostId() {
        return postId;
    }
    public void setPostId(ObjectId postId) {
        this.postId = postId;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    // public List<Like> getLikes() {
    //     return likes;
    // }
    // public void setLikes(List<Like> likes) {
    //     this.likes = likes;
    // }
    // public List<Comment> getComments() {
    //     return comments;
    // }
    // public void setComments(List<Comment> comments) {
    //     this.comments = comments;
    // }

    
   


    
    
}