// // package com.instagram.auth.registration;

// // import java.util.Optional;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.GetMapping;
// // import org.springframework.web.bind.annotation.PathVariable;
// // import org.springframework.web.bind.annotation.RequestMapping;
// // import org.springframework.web.bind.annotation.RestController;

// // import com.instagram.response.Response;


// // @RestController
// // @RequestMapping("/api/users")
// // public class UserController {

// //     @Autowired
// //     private RegisterRepository registerRepository;

// //     // ✅ Get user profile by username
// //     @GetMapping("/{username}")
// //     public ResponseEntity<Response> getUserByUsername(@PathVariable String username) {
// //         Optional<Register> userOpt = registerRepository.findByUserName(username);

// //         if (userOpt.isEmpty()) {
// //             return ResponseEntity.status(404)
// //                     .body(new Response(404, "User not found", false));
// //         }

// //         return ResponseEntity.ok(new Response(200, "User found", true, userOpt.get()));
// //     }
// // }

// package com.instagram.auth.registration;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.instagram.post.Post;
// import com.instagram.post.PostRepository;
// import com.instagram.response.Response;

// @RestController
// @RequestMapping("/api/v1/users") // 👈 changed to match frontend
// public class UserController {

//     @Autowired
//     private RegisterRepository registerRepository;

//     @Autowired
//     private PostRepository postRepository;

//     // ✅ Get user profile by username
//     @GetMapping("/username/{username}") // 👈 added "username/" prefix
//     public ResponseEntity<Response> getUserByUsername(@PathVariable String username) {
//         Optional<Register> userOpt = registerRepository.findByUserName(username);

//         if (userOpt.isEmpty()) {
//             return ResponseEntity.status(404)
//                     .body(new Response(404, "User not found", false));
//         }

//         return ResponseEntity.ok(new Response(200, "User found", true, userOpt.get()));
//     }

//     // // ✅ Search users by username/fullname
//     // @GetMapping("/search/{query}")
//     // public ResponseEntity<Response> searchUsers(@PathVariable String query) {
//     //     List<Register> users =
//     //             registerRepository.findByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCase(query, query);

//     //     return ResponseEntity.ok(
//     //             new Response(200, users.isEmpty() ? "No users found" : "Users found", true, users)
//     //     );
//     // }
//     @GetMapping("/search/all/{query}")
// public ResponseEntity<Response> searchAll(@PathVariable String query) {
//     List<Register> users = registerRepository.findByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCase(query, query);
//     List<Post> posts = postRepository.findByCaptionContainingIgnoreCase(query);
//     Map<String, Object> result = new HashMap<>();
//     result.put("users", users);
//     result.put("posts", posts);
//     return ResponseEntity.ok(new Response(200, "Search results", true, result));
// }

// }
package com.instagram.auth.registration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.post.Post;
import com.instagram.post.PostRepository;
import com.instagram.response.Response;

@RestController
@RequestMapping("/api/v1/users") // Matches frontend calls
public class UserController {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PostRepository postRepository;

    // ✅ Get user profile by username
    @GetMapping("/username/{username}")
    public ResponseEntity<Response> getUserByUsername(@PathVariable String username) {
        Optional<Register> userOpt = registerRepository.findByUserName(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new Response(404, "User not found", false));
        }

        return ResponseEntity.ok(new Response(200, "User found", true, userOpt.get()));
    }

    // ✅ Search users and posts by query
    @GetMapping("/search/all/{query}")
    public ResponseEntity<Response> searchAll(@PathVariable String query) {

        // Search users by username or fullName
        List<Register> users = registerRepository
                .findByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCase(query, query);

        // Search posts by caption
        List<Post> posts = postRepository
                .findByCaptionContainingIgnoreCase(query);

        // Combine results in a map
        Map<String, Object> result = new HashMap<>();
        result.put("users", users);
        result.put("posts", posts);

        return ResponseEntity.ok(new Response(200, "Search results", true, result));
    }
}
