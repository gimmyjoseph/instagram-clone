// package com.instagram.auth.profile;

// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.instagram.util.JwtUtil;


// @Service
// public class ProfileTokenService {

//     @Autowired
//     private JwtUtil jwtUtil;

//     @SuppressWarnings("CallToPrintStackTrace")
//     public Optional<Map<String, Object>> decodeAccessToken(String accessToken) {
//         try {
//             Map<String, Object> decodedToken = jwtUtil.decodeToken(accessToken);
//             return Optional.of(decodedToken);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return Optional.empty();
//         }
//     }
// }
// src/main/java/com/instagram/auth/profile/ProfileTokenService.java
package com.instagram.auth.profile;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.util.JwtUtil;

import io.jsonwebtoken.JwtException;

@Service
public class ProfileTokenService {

    @Autowired
    private JwtUtil jwtUtil;

    public Optional<Map<String, Object>> decodeAccessToken(String accessToken) {
        try {
            Map<String, Object> decodedToken = jwtUtil.decodeToken(accessToken);
            return Optional.of(decodedToken);
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Token decoding failed: " + e.getMessage());
            return Optional.empty();
        }
    }
}