// package com.instagram.posts;

// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.instagram.response.Response;

// @RequestMapping("/api")
// @RestController

// public class PostController {

    
//     @Autowired
//     private PostService postService;

    
//     @PostMapping("/addPosts")
//     public ResponseEntity<Response> addPostsBasedOnUserId(@RequestBody UserIds newPosts){
//         Response response=postService.addPosts(newPosts);
//         return ResponseEntity.status(response.getStatuscode()).body(response);
        
//     }
//     @GetMapping("/get/{userId}")
//     public ResponseEntity<Response> getAllPosts(@PathVariable String userId){
//         Response response=postService.getPosts(userId);
//         return ResponseEntity.status(response.getStatuscode()).body(response);
//     }
           
    
//     @PostMapping("/addLike/{userId}")
//      public ResponseEntity<Response> postAllikes( @PathVariable String userId, @RequestBody Map<String, String> body) {

//                 String postId = body.get("postId");
//                 Response response = postService.addLikes(userId, postId);
//                 return ResponseEntity.status(response.getStatuscode()).body(response);
// }

        
// }