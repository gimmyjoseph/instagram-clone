package com.instagram.auth.refreshtoken;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.response.Response;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class RefreshTokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/refresh")
    public ResponseEntity<Response> refreshToken(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            System.out.println("Refresh token request received: authHeader=" + (authHeader != null ? authHeader : "null"));
            Response result = refreshTokenService.refreshToken(authHeader, request.getCookies(), response);
            return ResponseEntity.status(result.getStatuscode()).body(result);
        } catch (Exception e) {
            System.err.println("Refresh token error: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(new Response(500, "Internal server error: " + e.getMessage(), false));
        }
    }
}
