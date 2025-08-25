// // // package com.instagram.auth.profile;

// // // import java.util.Map;
// // // import java.util.Optional;

// // // import org.springframework.beans.factory.annotation.Autowired;
// // // import org.springframework.http.ResponseEntity;
// // // import org.springframework.web.bind.annotation.GetMapping;
// // // import org.springframework.web.bind.annotation.RequestMapping;
// // // import org.springframework.web.bind.annotation.RestController;

// // // import jakarta.servlet.http.Cookie;
// // // import jakarta.servlet.http.HttpServletRequest;

// // // @RestController
// // // @RequestMapping("/api/v1/auth")
// // // public class ProfileController {

// // //     @Autowired
// // //     private ProfileTokenService authService;
// // //     @GetMapping("/profile")
// // // public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
// // //     String accessToken = getAccessTokenFromCookies(request);
// // //     System.out.println("Profile request - Access token: " + (accessToken != null ? accessToken : "null"));
    
// // //     if (accessToken == null) {
// // //         return ResponseEntity.status(401).body("Access token not found or expired");
// // //     }

// // //     Optional<Map<String, Object>> userDataOpt = authService.decodeAccessToken(accessToken);
// // //     if (userDataOpt.isPresent()) {
// // //         Map<String, Object> userData = userDataOpt.get();
// // //         System.out.println("Profile data from token: " + userData);

// // //         // 🚨 Guarantee userId exists
// // //         String userId = (String) userData.get("userId");
// // //         if (userId == null || userId.isEmpty()) {
// // //             return ResponseEntity.status(400).body("Profile response missing userId");
// // //         }

// // //         // 🛠️ Ensure defaults for frontend
// // //         userData.computeIfAbsent("userName", k -> "Unknown");
// // //         userData.computeIfAbsent("email", k -> "");
// // //         userData.computeIfAbsent("fullName", k -> "");
// // //         userData.computeIfAbsent("phoneNumber", k -> "");
// // //         userData.computeIfAbsent("followerCount", k -> 0);
// // //         userData.computeIfAbsent("followingCount", k -> 0);
// // //         userData.computeIfAbsent("isPrivate", k -> false);
// // //         userData.computeIfAbsent("emailVerified", k -> false);
// // //         userData.computeIfAbsent("phoneVerified", k -> false);
// // //         userData.computeIfAbsent("birthDate", k -> "");

// // //         return ResponseEntity.ok(userData);
// // //     }

// // //     return ResponseEntity.status(401).body("Invalid or expired token");
// // // }


// // //     // @GetMapping("/profile")
// // //     // public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
// // //     //     String accessToken = getAccessTokenFromCookies(request);
// // //     //     System.out.println("Profile request - Access token: " + accessToken); // Debugging
// // //     //     if (accessToken == null) {
// // //     //         System.out.println("No access token found in cookies");
// // //     //         return ResponseEntity.status(401).body("Access token not found or expired");
// // //     //     }

// // //     //     Optional<Map<String, Object>> userData = authService.decodeAccessToken(accessToken);
// // //     //     if (userData.isPresent()) {
// // //     //         System.out.println("Profile data: " + userData.get());
// // //     //         return ResponseEntity.ok(userData.get());
// // //     //     } else {
// // //     //         System.out.println("Token decoding failed for token: " + accessToken);
// // //     //         return ResponseEntity.status(401).body("Invalid or expired token");
// // //     //     }
// // //     // }
// // // //     @GetMapping("/profile")
// // // // public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
// // // //     String accessToken = getAccessTokenFromCookies(request);
// // // //     System.out.println("Profile request - Access token: " + (accessToken != null ? accessToken : "null")); // Debugging
// // // //     if (accessToken == null) {
// // // //         System.out.println("No access token found in cookies");
// // // //         return ResponseEntity.status(401).body(new Response(401, "Access token not found", false));
// // // //     }

// // // //     Optional<Map<String, Object>> userData = authService.decodeAccessToken(accessToken);
// // // //     if (userData.isPresent()) {
// // // //         System.out.println("Profile data: " + userData.get());
// // // //         return ResponseEntity.ok(new Response(200, "Profile retrieved", true, userData.get()));
// // // //     } else {
// // // //         System.out.println("Token decoding failed for token: " + accessToken);
// // // //         return ResponseEntity.status(401).body(new Response(401, "Invalid or expired token", false));
// // // //     }
// // // // }

// // //     private String getAccessTokenFromCookies(HttpServletRequest request) {
// // //         Cookie[] cookies = request.getCookies();
// // //         if (cookies != null) {
// // //             for (Cookie cookie : cookies) {
// // //                 if ("access_token".equals(cookie.getName())) {
// // //                     return cookie.getValue();
// // //                 }
// // //             }
// // //         }
// // //         return null;
// // //     }
// // // }

// // // // package com.instagram.auth.profile;

// // // // import java.util.Map;
// // // // import java.util.Optional;

// // // // import org.springframework.beans.factory.annotation.Autowired;
// // // // import org.springframework.http.ResponseEntity;
// // // // import org.springframework.web.bind.annotation.CrossOrigin;
// // // // import org.springframework.web.bind.annotation.GetMapping;
// // // // import org.springframework.web.bind.annotation.RequestMapping;
// // // // import org.springframework.web.bind.annotation.RestController;

// // // // import com.instagram.auth.registration.Register;
// // // // import com.instagram.auth.registration.RegisterRepository;
// // // // import com.instagram.response.Response;


// // // // import jakarta.servlet.http.Cookie;
// // // // import jakarta.servlet.http.HttpServletRequest;

// // // // @RestController
// // // // @RequestMapping("/api/v1/auth")
// // // // // @CrossOrigin(origins = "http://localhost:3000", allowCredentials = true)
// // // // public class ProfileController {

// // // //     @Autowired
// // // //     private ProfileTokenService authService;

// // // //     @Autowired
// // // //     private RegisterRepository registerRepository;

// // // //     @GetMapping("/profile")
// // // //     public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
// // // //         String accessToken = getAccessTokenFromCookies(request);
// // // //         System.out.println("Profile request - Access token: " + (accessToken != null ? accessToken : "null")); // Debugging
// // // //         if (accessToken == null) {
// // // //             System.out.println("No access token found in cookies. Cookies: " + java.util.Arrays.toString(request.getCookies()));
// // // //             return ResponseEntity.status(401).body(new Response(401, "Access token not found", false));
// // // //         }

// // // //         Optional<Map<String, Object>> userDataOpt = authService.decodeAccessToken(accessToken);
// // // //         if (userDataOpt.isPresent()) {
// // // //             Map<String, Object> userData = userDataOpt.get();
// // // //             System.out.println("Profile data from token: " + userData);

// // // //             // Ensure userId is included
// // // //             String userId = (String) userData.get("userId");
// // // //             if (userId == null) {
// // // //                 String email = (String) userData.get("email");
// // // //                 String userName = (String) userData.get("userName");
// // // //                 if (email != null || userName != null) {
// // // //                     Optional<Register> userOpt = email != null 
// // // //                         ? registerRepository.findByEmail(email)
// // // //                         : registerRepository.findByUserName(userName);
// // // //                     if (userOpt.isPresent()) {
// // // //                         userId = userOpt.get().getObjectId().toHexString();
// // // //                         userData.put("userId", userId);
// // // //                         System.out.println("Fetched userId from database: " + userId);
// // // //                     } else {
// // // //                         System.out.println("User not found in database for email: " + email + " or userName: " + userName);
// // // //                     }
// // // //                 }
// // // //             }

// // // //             // Ensure required fields for UserContext.js
// // // //             userData.computeIfAbsent("userId", k -> userId != null ? userId : "");
// // // //             userData.computeIfAbsent("userName", k -> "Unknown");
// // // //             userData.computeIfAbsent("email", k -> "");
// // // //             userData.computeIfAbsent("fullName", k -> "");
// // // //             userData.computeIfAbsent("phoneNumber", k -> "");
// // // //             userData.computeIfAbsent("followerCount", k -> 0);
// // // //             userData.computeIfAbsent("followingCount", k -> 0);
// // // //             userData.computeIfAbsent("isPrivate", k -> false);
// // // //             userData.computeIfAbsent("emailVerified", k -> false);
// // // //             userData.computeIfAbsent("phoneVerified", k -> false);
// // // //             userData.computeIfAbsent("birthDate", k -> "");

// // // //             return ResponseEntity.ok(new Response(200, "Profile retrieved", true, userData));
// // // //         } else {
// // // //             System.out.println("Token decoding failed for token: " + accessToken);
// // // //             return ResponseEntity.status(401).body(new Response(401, "Invalid or expired token", false));
// // // //         }
// // // //     }

// // // //     private String getAccessTokenFromCookies(HttpServletRequest request) {
// // // //         Cookie[] cookies = request.getCookies();
// // // //         if (cookies != null) {
// // // //             for (Cookie cookie : cookies) {
// // // //                 if ("access_token".equals(cookie.getName())) {
// // // //                     return cookie.getValue();
// // // //                 }
// // // //             }
// // // //         }
// // // //         return null;
// // // //     }
// // // // }

// // package com.instagram.auth.profile;

// // import java.util.Map;
// // import java.util.Optional;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.GetMapping;
// // import org.springframework.web.bind.annotation.RequestMapping;
// // import org.springframework.web.bind.annotation.RestController;

// // import jakarta.servlet.http.Cookie;
// // import jakarta.servlet.http.HttpServletRequest;

// // @RestController
// // @RequestMapping("/api/v1/auth")
// // public class ProfileController {

// //     @Autowired
// //     private ProfileTokenService authService;

// //     @GetMapping("/profile")
// //     public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
// //         String accessToken = getAccessTokenFromCookies(request);
// //         System.out.println("Profile request - Access token: " + (accessToken != null ? accessToken : "null"));

// //         if (accessToken == null) {
// //             return ResponseEntity.status(401).body("Access token not found or expired");
// //         }

// //         Optional<Map<String, Object>> userDataOpt = authService.decodeAccessToken(accessToken);
// //         if (userDataOpt.isPresent()) {
// //             Map<String, Object> userData = userDataOpt.get();
// //             System.out.println("Profile data from token: " + userData);

// //             // ✅ Guarantee userId exists (check claim, then fallback to sub)
// //             String userId = (String) userData.get("userId");
// //             if (userId == null || userId.isEmpty()) {
// //                 Object sub = userData.get("sub"); // JWT standard subject
// //                 if (sub != null) {
// //                     userId = sub.toString();
// //                     userData.put("userId", userId);
// //                     System.out.println("Fallback: using subject as userId -> " + userId);
// //                 }
// //             }

// //             if (userId == null || userId.isEmpty()) {
// //                 return ResponseEntity.status(400).body("Profile response missing userId");
// //             }

// //             // 🛠️ Ensure defaults for frontend
// //             userData.computeIfAbsent("userName", k -> "Unknown");
// //             userData.computeIfAbsent("email", k -> "");
// //             userData.computeIfAbsent("fullName", k -> "");
// //             userData.computeIfAbsent("phoneNumber", k -> "");
// //             userData.computeIfAbsent("followerCount", k -> 0);
// //             userData.computeIfAbsent("followingCount", k -> 0);
// //             userData.computeIfAbsent("isPrivate", k -> false);
// //             userData.computeIfAbsent("emailVerified", k -> false);
// //             userData.computeIfAbsent("phoneVerified", k -> false);
// //             userData.computeIfAbsent("birthDate", k -> "");

// //             return ResponseEntity.ok(userData);
// //         }

// //         return ResponseEntity.status(401).body("Invalid or expired token");
// //     }

// //     private String getAccessTokenFromCookies(HttpServletRequest request) {
// //         Cookie[] cookies = request.getCookies();
// //         if (cookies != null) {
// //             for (Cookie cookie : cookies) {
// //                 if ("access_token".equals(cookie.getName())) {
// //                     return cookie.getValue();
// //                 }
// //             }
// //         }
// //         return null;
// //     }
// // }
// package com.instagram.auth.profile;

// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;

// @RestController
// @RequestMapping("/api/v1/auth")
// public class ProfileController {

//     @Autowired
//     private ProfileTokenService authService;

//     @GetMapping("/profile")
//     public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
//         String accessToken = getAccessTokenFromCookies(request);
//         System.out.println("Profile request - Access token: " + accessToken); // Debugging
//         if (accessToken == null) {
//             System.out.println("No access token found in cookies");
//             return ResponseEntity.status(401).body("Access token not found or expired");
//         }

//         Optional<Map<String, Object>> userData = authService.decodeAccessToken(accessToken);
//         if (userData.isPresent()) {
//             System.out.println("Profile data: " + userData.get());
//             return ResponseEntity.ok(userData.get());
//         } else {
//             System.out.println("Token decoding failed for token: " + accessToken);
//             return ResponseEntity.status(401).body("Invalid or expired token");
//         }
//     }

//     private String getAccessTokenFromCookies(HttpServletRequest request) {
//         Cookie[] cookies = request.getCookies();
//         if (cookies != null) {
//             for (Cookie cookie : cookies) {
//                 if ("access_token".equals(cookie.getName())) {
//                     return cookie.getValue();
//                 }
//             }
//         }
//         return null;
//     }
// }

// src/main/java/com/instagram/auth/profile/ProfileController.java
package com.instagram.auth.profile;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.response.Response;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest; 

@RestController
@RequestMapping("/api/v1/auth")
public class ProfileController {

    @Autowired
    private ProfileTokenService authService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        String accessToken = getAccessTokenFromCookies(request);

        if (accessToken == null) {
            return ResponseEntity.status(401).body(new Response(401, "Access token not found", false));
        }

        Optional<Map<String, Object>> userDataOpt = authService.decodeAccessToken(accessToken);
        if (userDataOpt.isPresent()) {
            Map<String, Object> userData = userDataOpt.get();
            
            String userId = (String) userData.get("userId");
            if (userId == null || userId.isEmpty()) {
                Object sub = userData.get("sub");
                if (sub != null) {
                    userId = sub.toString();
                    userData.put("userId", userId);
                }
            }

            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body(new Response(400, "Profile response missing userId", false));
            }
            
            userData.computeIfAbsent("userName", k -> "Unknown");
            userData.computeIfAbsent("email", k -> "");
            userData.computeIfAbsent("fullName", k -> "");
            userData.computeIfAbsent("followerCount", k -> 0);
            userData.computeIfAbsent("followingCount", k -> 0);
            
            return ResponseEntity.ok(new Response(200, "Profile retrieved", true, userData));
        } else {
            return ResponseEntity.status(401).body(new Response(401, "Invalid or expired token", false));
        }
    }

    private String getAccessTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("access_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}