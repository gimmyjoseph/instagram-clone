package com.instagram.comments;

import java.util.List;

public class Comment {
    private List<String> userid;
    private List<String> replies;
    public List<String> getUserid() {
        return userid;
    }
    public void setUserid(List<String> userid) {
        this.userid = userid;
    }
    public List<String> getReplies() {
        return replies;
    }
    public void setReplies(List<String> replies) {
        this.replies = replies;
    }
}

