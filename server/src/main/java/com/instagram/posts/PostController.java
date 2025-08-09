package com.instagram.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterService;
import com.instagram.response.Response;

@RequestMapping("/api")
@RestController

public class PostController {

    
    @Autowired
    private PostService postService;

    
    @PostMapping("/addPosts")
    public ResponseEntity<Response> addPostsBasedOnUserId(@RequestBody UserIds newPosts){
        Response response=postService.addPosts(newPosts);
        return ResponseEntity.status(response.getStatuscode()).body(response);
        
    }
    // @GetMapping("/get")
    
}

