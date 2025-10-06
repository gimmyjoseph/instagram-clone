
package com.instagram.post;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.instagram.response.Response;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // ---------------- Create Post ----------------
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> createPost(
            @RequestParam("userId") String userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "caption", required = false) String caption) {

        Response response = postService.createPost(userId, file, caption);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    // ---------------- Get Posts ----------------
    @GetMapping("/user/{userId}")
    public ResponseEntity<Response> getUserPosts(@PathVariable String userId) {
        Response response = postService.getUserPosts(userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<Response> getFollowingPosts(@PathVariable String userId) {
        Response response = postService.getFollowingPosts(userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    // ---------------- Delete Post ----------------
    @DeleteMapping("/{postId}/{userId}")
    public ResponseEntity<Response> deletePost(
            @PathVariable String postId,
            @PathVariable String userId) {

        Response response = postService.deletePost(postId, userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    // ---------------- Like / Unlike ----------------
    @PostMapping("/like/{postId}/{userId}")
    public ResponseEntity<Response> likePost(
            @PathVariable String postId,
            @PathVariable String userId) {

        Response response = postService.likePost(postId, userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    // ---------------- Get Likes ----------------
    @GetMapping("/likes/{postId}")
    public ResponseEntity<Response> getPostLikes(@PathVariable String postId) {
        Response response = postService.getPostLikes(postId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    // ---------------- Update Caption ----------------
    @PatchMapping("/caption/{postId}/{userId}")
    public ResponseEntity<Response> updateCaption(
            @PathVariable String postId,
            @PathVariable String userId,
            @RequestBody Map<String, String> body) {

        String newCaption = body.get("caption");
        Response response = postService.updateCaption(postId, userId, newCaption);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    // ---------------- Add Comment ----------------
    @PostMapping("/comment/{postId}/{userId}")
    public ResponseEntity<Response> addComment(
            @PathVariable String postId,
            @PathVariable String userId,
            @RequestBody Map<String, String> body) {

        String text = body.get("text");
        Response response = postService.addComment(postId, userId, text);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    


@DeleteMapping("/comment/{postId}/{userId}/{commentId}")
public ResponseEntity<Response> deleteComment(
        @PathVariable String postId,
        @PathVariable String userId,
        @PathVariable String commentId) {

    Response response = postService.deleteComment(postId, commentId, userId);
    return ResponseEntity.status(response.getStatuscode()).body(response);
}

    // ---------------- Get Comments ----------------
    @GetMapping("/comments/{postId}")
    public ResponseEntity<Response> getComments(@PathVariable String postId) {
        Response response = postService.getComments(postId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }
}
