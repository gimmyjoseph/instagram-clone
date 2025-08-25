package com.instagram.auth.login;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.response.Response;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody Login login, HttpServletResponse response) {
        try {
            Response result = loginService.authenticate(login, response);
            return ResponseEntity.status(result.getStatuscode()).body(result);
        } catch (Exception e) {
            System.err.println("Login error for identifier " + login.getIdentifier() + ": " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(new Response(500, "Internal server error: " + e.getMessage(), false));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Response> logout(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            // Response result = loginService.logout(authHeader, request.getCookies(), response);
            Response result = loginService.logout(request.getCookies(), response);
            return ResponseEntity.status(result.getStatuscode()).body(result);
        } catch (Exception e) {
            System.err.println("Logout error: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(new Response(500, "Internal server error: " + e.getMessage(), false));
        }
    }
}