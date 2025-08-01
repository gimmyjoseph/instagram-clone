
package com.instagram.auth.refreshtoken;

import java.util.LinkedHashMap;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.auth.login.token.service.TokenService;
import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.response.Response;
import com.instagram.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class RefreshTokenService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private JwtUtil jwtUtil;

    public Response refreshToken(String authHeader, Cookie[] cookies, HttpServletResponse response) {
        String refreshToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    System.out.println("Refresh token found in cookie: " + refreshToken);
                    break;
                }
            }
        }
        if (refreshToken == null && authHeader != null && authHeader.startsWith("Bearer ")) {
            refreshToken = authHeader.substring(7);
            System.out.println("Refresh token found in Authorization header: " + refreshToken);
        }
        if (refreshToken == null) {
            System.out.println("Missing refresh token");
            return new Response(401, "Missing refresh token", false);
        }
        if (!jwtUtil.validateRefreshToken(refreshToken)) {
            System.out.println("Invalid refresh token");
            return new Response(401, "Invalid refresh token", false);
        }
        String userId = jwtUtil.extractUserId(refreshToken);
        Register user = registerRepository.findById(new ObjectId(userId)).orElse(null);
        if (user == null) {
            System.out.println("User not found for userId: " + userId);
            return new Response(401, "User not found", false);
        }

        // Check for null objectId
        if (user.getObjectId() == null) {
            System.err.println("User document has null objectId for userId: " + userId);
            return new Response(500, "Internal server error: User document missing ID", false);
        }

        Map<String, Object> claims = new LinkedHashMap<>();
        claims.put("user_id", userId);
        claims.put("full_name", user.getFullName());
        claims.put("email", user.getEmail());
        claims.put("username", user.getUserName());
        claims.put("phone_number", user.getPhoneNumber());

        String newAccessToken = jwtUtil.generateAccessToken(userId, claims);
        String newRefreshToken = jwtUtil.generateRefreshToken(userId);
        tokenService.saveToken(userId, user.getEmail(), newAccessToken, newRefreshToken);

        // Expire existing refresh token cookie
        Cookie expireRefreshTokenCookie = new Cookie("refresh_token", null);
        expireRefreshTokenCookie.setHttpOnly(true);
        expireRefreshTokenCookie.setSecure(false); // Enable for HTTPS in production
        expireRefreshTokenCookie.setPath("/");
        expireRefreshTokenCookie.setMaxAge(0);
        response.addCookie(expireRefreshTokenCookie);

        // Set new access token cookie
        Cookie accessTokenCookie = new Cookie("access_token", newAccessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(false); // Enable for HTTPS in production
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(15 * 60); // 15 minutes
        response.addCookie(accessTokenCookie);

        // Set new refresh token cookie
        Cookie refreshTokenCookie = new Cookie("refresh_token", newRefreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false); // Enable for HTTPS in production
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        response.addCookie(refreshTokenCookie);

        System.out.println("Tokens refreshed for email: " + user.getEmail());
        return new Response(200, "Tokens refreshed", true);
    }
}