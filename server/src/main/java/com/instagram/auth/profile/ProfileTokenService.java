package com.instagram.auth.profile;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.util.JwtUtil;


@Service
public class ProfileTokenService {

    @Autowired
    private JwtUtil jwtUtil;

    @SuppressWarnings("CallToPrintStackTrace")
    public Optional<Map<String, Object>> decodeAccessToken(String accessToken) {
        try {
            Map<String, Object> decodedToken = jwtUtil.decodeToken(accessToken);
            return Optional.of(decodedToken);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}