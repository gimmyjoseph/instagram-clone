package com.instagram.auth.profile;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        System.out.println("Profile request - Access token: " + accessToken); // Debugging
        if (accessToken == null) {
            System.out.println("No access token found in cookies");
            return ResponseEntity.status(401).body("Access token not found or expired");
        }

        Optional<Map<String, Object>> userData = authService.decodeAccessToken(accessToken);
        if (userData.isPresent()) {
            System.out.println("Profile data: " + userData.get());
            return ResponseEntity.ok(userData.get());
        } else {
            System.out.println("Token decoding failed for token: " + accessToken);
            return ResponseEntity.status(401).body("Invalid or expired token");
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
