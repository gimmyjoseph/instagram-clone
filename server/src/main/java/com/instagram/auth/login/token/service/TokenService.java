package com.instagram.auth.login.token.service;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.auth.login.token.TokenRepository;
import com.instagram.auth.login.token.UserAccessToken;
import com.instagram.auth.login.token.UserRefreshToken;
import com.instagram.auth.login.token.UserToken;
import com.instagram.auth.login.token.UserTokenEntry;
import com.instagram.util.JwtUtil;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public void saveToken(String userId, String email, String accessToken, String refreshToken) {
        long accessExpiresAt = jwtUtil.getAccessExpirationTime();
        long refreshExpiresAt = jwtUtil.getRefreshExpirationTime();
        try {
            UserToken token = tokenRepository.findByUserId(userId);
            if (token == null) {
                token = new UserToken();
                token.setUserId(userId);
                token.setEmail(email);
                token.setTokens(new ArrayList<>());
                System.out.println("Created new token document for userId: " + userId);
            } else {
                token.setEmail(email);
            }
            token.getTokens().add(new UserTokenEntry(
                    new UserAccessToken(accessToken, accessExpiresAt),
                    new UserRefreshToken(refreshToken, refreshExpiresAt)));
            tokenRepository.save(token);
            System.out.println("Appended tokens for userId: " + userId);
        } catch (Exception e) {
            System.err.println("Error saving tokens for userId " + userId + ": " + e.getMessage());
            throw new RuntimeException("Failed to save tokens: " + e.getMessage());
        }
    }

    public void invalidateTokens(String userId) {
        try {
            UserToken token = tokenRepository.findByUserId(userId);
            if (token != null) {
                tokenRepository.delete(token);
                System.out.println("Deleted token document for userId: " + userId);
            } else {
                System.out.println("No tokens found for userId: " + userId);
            }
        } catch (Exception e) {
            System.err.println("Error invalidating tokens for userId " + userId + ": " + e.getMessage());
            throw new RuntimeException("Failed to invalidate tokens: " + e.getMessage());
        }
    }
}