// // // // // package com.instagram.post;

// // // // // import org.bson.types.ObjectId;
// // // // // import org.springframework.data.annotation.Id;
// // // // // import org.springframework.data.mongodb.core.mapping.Document;

// // // // // @Document(collection = "postsnew") // MongoDB collection name
// // // // // public class Post {

// // // // //     @Id
// // // // //     private ObjectId id;

// // // // //     private String userId;
// // // // //     private String content;

// // // // //     public Post() {}

// // // // //     public Post(String userId, String content) {
// // // // //         this.userId = userId;
// // // // //         this.content = content;
// // // // //     }

// // // // //     public ObjectId getId() {
// // // // //         return id;
// // // // //     }
// // // // //     public void setId(ObjectId id) {
// // // // //         this.id = id;
// // // // //     }

// // // // //     public String getUserId() {
// // // // //         return userId;
// // // // //     }
// // // // //     public void setUserId(String userId) {
// // // // //         this.userId = userId;
// // // // //     }

// // // // //     public String getContent() {
// // // // //         return content;
// // // // //     }
// // // // //     public void setContent(String content) {
// // // // //         this.content = content;
// // // // //     }
// // // // // }
// // // // package com.instagram.post;

// // // // import org.bson.types.ObjectId;
// // // // import org.springframework.data.annotation.Id;
// // // // import org.springframework.data.mongodb.core.mapping.Document;

// // // // @Document(collection = "postsnew")
// // // // public class Post {
// // // //     @Id
// // // //     private ObjectId id;
// // // //     private String userId;
// // // //     private String content;
// // // //     private String caption;

// // // //     public Post() {}
// // // //     public Post(String userId, String content, String caption) {
// // // //         this.userId = userId;
// // // //         this.content = content;
// // // //         this.caption = caption;
// // // //     }

// // // //     public ObjectId getId() { return id; }
// // // //     public void setId(ObjectId id) { this.id = id; }
// // // //     public String getUserId() { return userId; }
// // // //     public void setUserId(String userId) { this.userId = userId; }
// // // //     public String getContent() { return content; }
// // // //     public void setContent(String content) { this.content = content; }
// // // //     public String getCaption() { return caption; }
// // // //     public void setCaption(String caption) { this.caption = caption; }
// // // // }

// // // package com.instagram.post;

// // // import org.bson.types.ObjectId;
// // // import org.springframework.data.annotation.Id;
// // // import org.springframework.data.mongodb.core.mapping.Document;

// // // @Document(collection = "postsnew")
// // // public class Post {
// // //     @Id
// // //     private ObjectId id;
// // //     private String userId;
// // //     private String username;   // 👈 new
// // //     private String content;    // image URL
// // //     private String caption;

// // //     public Post() {}

// // //     public Post(String userId, String username, String content, String caption) {
// // //         this.userId = userId;
// // //         this.username = username;
// // //         this.content = content;
// // //         this.caption = caption;
// // //     }

// // //     public ObjectId getId() { return id; }
// // //     public void setId(ObjectId id) { this.id = id; }

// // //     public String getUserId() { return userId; }
// // //     public void setUserId(String userId) { this.userId = userId; }

// // //     public String getUsername() { return username; }
// // //     public void setUsername(String username) { this.username = username; }

// // //     public String getContent() { return content; }
// // //     public void setContent(String content) { this.content = content; }

// // //     public String getCaption() { return caption; }
// // //     public void setCaption(String caption) { this.caption = caption; }
// // // }

// // package com.instagram.post;

// // import java.util.ArrayList;
// // import java.util.List;

// // import org.bson.types.ObjectId;
// // import org.springframework.data.annotation.Id;
// // import org.springframework.data.mongodb.core.mapping.Document;

// // @Document(collection = "postsnew")
// // public class Post {
// //     @Id
// //     private ObjectId id;
// //     private String userId;
// //     private String username;
// //     private String content;    // image URL
// //     private String caption;
// //     private List<Like> likes;  // Store userId and username of users who liked
// //     private int likeCount;     // Track number of likes

// //     public Post() {
// //         this.likes = new ArrayList<>();
// //         this.likeCount = 0;
// //     }

// //     public Post(String userId, String username, String content, String caption) {
// //         this.userId = userId;
// //         this.username = username;
// //         this.content = content;
// //         this.caption = caption;
// //         this.likes = new ArrayList<>();
// //         this.likeCount = 0;
// //     }

// //     public ObjectId getId() { return id; }
// //     public void setId(ObjectId id) { this.id = id; }

// //     public String getUserId() { return userId; }
// //     public void setUserId(String userId) { this.userId = userId; }

// //     public String getUsername() { return username; }
// //     public void setUsername(String username) { this.username = username; }

// //     public String getContent() { return content; }
// //     public void setContent(String content) { this.content = content; }

// //     public String getCaption() { return caption; }
// //     public void setCaption(String caption) { this.caption = caption; }

// //     public List<Like> getLikes() { return likes; }
// //     public void setLikes(List<Like> likes) { 
// //         this.likes = likes;
// //         this.likeCount = likes.size();
// //     }

// //     public int getLikeCount() { return likeCount; }
// //     public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

// //     public void addLike(String userId, String username) {
// //         if (!likes.stream().anyMatch(like -> like.getUserId().equals(userId))) {
// //             likes.add(new Like(userId, username));
// //             likeCount = likes.size();
// //         }
// //     }

// //     public void removeLike(String userId) {
// //         likes.removeIf(like -> like.getUserId().equals(userId));
// //         likeCount = likes.size();
// //     }

// //     // Inner class to store like details
// //     public static class Like {
// //         private String userId;
// //         private String username;

// //         public Like() {}

// //         public Like(String userId, String username) {
// //             this.userId = userId;
// //             this.username = username;
// //         }

// //         public String getUserId() { return userId; }
// //         public void setUserId(String userId) { this.userId = userId; }

// //         public String getUsername() { return username; }
// //         public void setUsername(String username) { this.username = username; }
// //     }
// // }
// package com.instagram.post;

// import java.util.ArrayList;
// import java.util.List;

// import org.bson.types.ObjectId;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// @Document(collection = "postsnew")
// public class Post {
//     @Id
//     private ObjectId id;
//     private String userId;
//     private String username;
//     private String content;    // image URL
//     private String caption;
//     private List<Like> likes;  // Store userId and username of users who liked
//     private int likeCount;     // Track number of likes

//     public Post() {
//         this.likes = new ArrayList<>();
//         this.likeCount = 0;
//     }

//     public Post(String userId, String username, String content, String caption) {
//         this.userId = userId;
//         this.username = username;
//         this.content = content;
//         this.caption = caption;
//         this.likes = new ArrayList<>();
//         this.likeCount = 0;
//     }

//     public String getId() { 
//         return id != null ? id.toHexString() : null; // Return string representation of ObjectId
//     }

//     public void setId(ObjectId id) { 
//         this.id = id; 
//     }

//     public String getUserId() { return userId; }
//     public void setUserId(String userId) { this.userId = userId; }

//     public String getUsername() { return username; }
//     public void setUsername(String username) { this.username = username; }

//     public String getContent() { return content; }
//     public void setContent(String content) { this.content = content; }

//     public String getCaption() { return caption; }
//     public void setCaption(String caption) { this.caption = caption; }

//     public List<Like> getLikes() { return likes; }
//     public void setLikes(List<Like> likes) { 
//         this.likes = likes;
//         this.likeCount = likes.size();
//     }

//     public int getLikeCount() { return likeCount; }
//     public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

//     public void addLike(String userId, String username,String fullName) {
//         if (!likes.stream().anyMatch(like -> like.getUserId().equals(userId))) {
//             likes.add(new Like(userId, username, fullName));
//             likeCount = likes.size();
//         }
//     }

//     public void removeLike(String userId) {
//         likes.removeIf(like -> like.getUserId().equals(userId));
//         likeCount = likes.size();
//     }

//     // Inner class to store like details
//     public static class Like {
//         private String userId;
//         private String username;
//         private String fullName; // 👈 add this
    
//         public Like() {}
    
//         public Like(String userId, String username, String fullName) {
//             this.userId = userId;
//             this.username = username;
//             this.fullName = fullName;
//         }
    
//         public String getUserId() { return userId; }
//         public void setUserId(String userId) { this.userId = userId; }
    
//         public String getUsername() { return username; }
//         public void setUsername(String username) { this.username = username; }
    
//         public String getFullName() { return fullName; }
//         public void setFullName(String fullName) { this.fullName = fullName; }
//     }
    
// }

package com.instagram.post;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "postsnew")
public class Post {
    @Id
    private ObjectId id;
    private String userId;
    private String username;
    private String content;    // image URL
    private String caption;
    private List<Like> likes;  // Store userId and username of users who liked
    private int likeCount;     // Track number of likes

    // ✅ Comments list
    private List<Comment> comments;

    public Post() {
        this.likes = new ArrayList<>();
        this.likeCount = 0;
        this.comments = new ArrayList<>();
    }

    public Post(String userId, String username, String content, String caption) {
        this.userId = userId;
        this.username = username;
        this.content = content;
        this.caption = caption;
        this.likes = new ArrayList<>();
        this.likeCount = 0;
        this.comments = new ArrayList<>();
    }

    // ---------------- Getters & Setters ----------------
    public String getId() { 
        return id != null ? id.toHexString() : null;
    }
    public void setId(ObjectId id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public List<Like> getLikes() { return likes; }
    public void setLikes(List<Like> likes) { 
        this.likes = likes;
        this.likeCount = likes.size();
    }

    public int getLikeCount() { return likeCount; }
    public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }

    // ---------------- Like Methods ----------------
    public void addLike(String userId, String username, String fullName) {
        if (!likes.stream().anyMatch(like -> like.getUserId().equals(userId))) {
            likes.add(new Like(userId, username, fullName));
            likeCount = likes.size();
        }
    }

    public void removeLike(String userId) {
        likes.removeIf(like -> like.getUserId().equals(userId));
        likeCount = likes.size();
    }

    // ---------------- Comment Methods ----------------
    public void addComment(String userId, String username, String fullName, String text) {
        Comment comment = new Comment(UUID.randomUUID().toString(), userId, username, fullName, text);
        comments.add(comment);
    }

 
 
    public boolean removeComment(String commentId, String userId, String postOwnerId) {
        if (comments == null || comments.isEmpty()) return false;
    
        commentId = commentId.trim();
        userId = userId.trim();
    
        for (Comment c : comments) {
            System.out.println("Checking commentId: " + c.getCommentId() + " vs " + commentId);
    
            if (c.getCommentId().equals(commentId)) {
                // Allow deletion if user is comment owner OR post owner
                if (c.getUserId().equals(userId) || postOwnerId.equals(userId)) {
                    comments.remove(c);
                    System.out.println("Comment removed successfully!");
                    return true;
                } else {
                    System.out.println("Unauthorized deletion attempt by userId: " + userId);
                    return false;
                }
            }
        }
    
        System.out.println("Comment not found with ID: " + commentId);
        return false;
    }
    
    // ---------------- Inner Classes ----------------
    public static class Like {
        private String userId;
        private String username;
        private String fullName;

        public Like() {}

        public Like(String userId, String username, String fullName) {
            this.userId = userId;
            this.username = username;
            this.fullName = fullName;
        }

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
    }

    public static class Comment {
        private String commentId;
        private String userId;
        private String username;
        private String fullName;
        private String text;

        public Comment() {}

        public Comment(String commentId, String userId, String username, String fullName, String text) {
            this.commentId = commentId;
            this.userId = userId;
            this.username = username;
            this.fullName = fullName;
            this.text = text;
        }

        public String getCommentId() { return commentId; }
        public void setCommentId(String commentId) { this.commentId = commentId; }

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}
