// // package com.instagram.auth.login;

// // import java.util.LinkedHashMap;
// // import java.util.Map;
// // import java.util.Optional;

// // import org.bson.types.ObjectId;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.stereotype.Service;

// // import com.instagram.auth.login.token.service.TokenService;
// // import com.instagram.auth.registration.Register;
// // import com.instagram.auth.registration.RegisterRepository;
// // import com.instagram.response.Response;
// // import com.instagram.util.JwtUtil;

// // import jakarta.servlet.http.Cookie;
// // import jakarta.servlet.http.HttpServletResponse;

// // @Service
// // public class LoginService {

// //     @Autowired
// //     private RegisterRepository registerRepository;

// //     @Autowired
// //     private TokenService tokenService;

// //     // @Autowired
// //     // private PasswordEncoder passwordEncoder;

// //     @Autowired
// //     private JwtUtil jwtUtil;

// //     public Response authenticate(Login login, HttpServletResponse response) {
// //         // Validate input
// //         if (login == null || login.getIdentifier() == null || login.getIdentifier().trim().isEmpty()) {
// //             System.out.println("Invalid login request: identifier is missing or empty");
// //             return new Response(400, "Identifier is required", false);
// //         }
// //         if (login.getPassword() == null || login.getPassword().trim().isEmpty()) {
// //             System.out.println("Invalid login request: password is missing or empty");
// //             return new Response(400, "Password is required", false);
// //         }

// //         String identifier = login.getIdentifier().trim();
// //         Optional<Register> optionalUser = Optional.empty();

// //         // Try finding user by phoneNumber, userName, or email
// //         System.out.println("Attempting to find user with identifier: " + identifier);
// //         optionalUser = registerRepository.findByPhoneNumber(identifier);
// //         if (optionalUser.isEmpty()) {
// //             System.out.println("No user found with phoneNumber: " + identifier);
// //             optionalUser = registerRepository.findByUserName(identifier);
// //         }
// //         if (optionalUser.isEmpty()) {
// //             System.out.println("No user found with userName: " + identifier);
// //             optionalUser = registerRepository.findByEmail(identifier);
// //         }
// //         if (optionalUser.isEmpty()) {
// //             System.out.println("No user found with email: " + identifier);
// //             return new Response(404, "User not found", false);
// //         }

// //         Register user = optionalUser.get();
// //         System.out.println("User found: " + user.getEmail());

// //         // Verify password (CHANGE: Use plain text comparison, comment out hashing for future)
// //         if (!login.getPassword().equals(user.getPassword())) {
// //             System.out.println("Invalid password for identifier: " + identifier);
// //             return new Response(401, "Invalid password", false);
// //         }
// //         // For future use: Password hashing verification
// //         /*
// //         if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
// //             System.out.println("Invalid password for identifier: " + identifier);
// //             return new Response(401, "Invalid password", false);
// //         }
// //         */

// //         // Check verification based on login method
// //         if (identifier.equals(user.getPhoneNumber()) && !user.isPhoneVerified()) {
// //             System.out.println("Phone not verified for identifier: " + identifier);
// //             return new Response(403, "Phone number not verified", false);
// //         }
// //         if (identifier.equals(user.getEmail()) && !user.isEmailVerified()) {
// //             System.out.println("Email not verified for identifier: " + identifier);
// //             return new Response(403, "Email not verified", false);
// //         }

// //         // Generate JWT tokens
// //         Map<String, Object> claims = new LinkedHashMap<>();
// //         claims.put("userId", user.getObjectId().toString());
// //         claims.put("fullName", user.getFullName());
// //         claims.put("email", user.getEmail());
// //         claims.put("username", user.getUserName());
// //         claims.put("phoneNumber", user.getPhoneNumber());

// //         String accessToken = jwtUtil.generateAccessToken(user.getObjectId().toString(), claims);
// //         String refreshToken = jwtUtil.generateRefreshToken(user.getObjectId().toString());
// //         saveTokens(user.getObjectId().toString(), user.getEmail(), accessToken, refreshToken);

// //         // Expire existing refresh token cookie
// //         Cookie expireRefreshTokenCookie = new Cookie("refresh_token", null);
// //         expireRefreshTokenCookie.setHttpOnly(true);
// //         expireRefreshTokenCookie.setSecure(false); // Enable for HTTPS in production
// //         expireRefreshTokenCookie.setPath("/");
// //         expireRefreshTokenCookie.setMaxAge(0);
// //         response.addCookie(expireRefreshTokenCookie);

// //         // Prepare response data
// //         Map<String, Object> data = new LinkedHashMap<>();
// //         data.put("id", user.getObjectId().toHexString());
// //         data.put("fullName", user.getFullName());
// //         data.put("email", user.getEmail());
// //         data.put("username", user.getUserName());
// //         data.put("phoneNumber", user.getPhoneNumber());

// //         // Set access token cookie
// //         Cookie accessTokenCookie = new Cookie("access_token", accessToken);
// //         accessTokenCookie.setHttpOnly(true);
// //         accessTokenCookie.setSecure(false); // Enable for HTTPS in production
// //         accessTokenCookie.setPath("/");
// //         accessTokenCookie.setMaxAge(15 * 60); // 15 minutes
// //         response.addCookie(accessTokenCookie);

// //         // Set refresh token cookie
// //         Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
// //         refreshTokenCookie.setHttpOnly(true);
// //         refreshTokenCookie.setSecure(false); // Enable for HTTPS in production
// //         refreshTokenCookie.setPath("/");
// //         refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
// //         response.addCookie(refreshTokenCookie);

// //         System.out.println("Authentication successful for identifier: " + identifier);
// //         return new Response(200, "Login successful", true, data);
// //     }

// //     public void saveTokens(String userId, String email, String accessToken, String refreshToken) {
// //         tokenService.saveToken(userId, email, accessToken, refreshToken);
// //         System.out.println("Tokens saved for email: " + email);
// //     }

// //     public Register getByEmail(String email) {
// //         return registerRepository.findByEmail(email).orElse(null);
// //     }

// //     public Register getById(String userId) {
// //         return registerRepository.findById(new ObjectId(userId)).orElse(null);
// //     }

// //     public Response logout(String authHeader, Cookie[] cookies, HttpServletResponse response) {
// //         String accessToken = null;
// //         String refreshToken = null;

// //         if (cookies != null) {
// //             for (Cookie cookie : cookies) {
// //                 if ("access_token".equals(cookie.getName())) {
// //                     accessToken = cookie.getValue();
// //                 } else if ("refresh_token".equals(cookie.getName())) {
// //                     refreshToken = cookie.getValue();
// //                 }
// //             }
// //         }

// //         if (accessToken == null && authHeader != null && authHeader.startsWith("Bearer ")) {
// //             accessToken = authHeader.substring(7);
// //         }

// //         String userId = null;
// //         if (accessToken != null && jwtUtil.validateToken(accessToken)) {
// //             userId = jwtUtil.extractUserId(accessToken);
// //         } else if (refreshToken != null && jwtUtil.validateRefreshToken(refreshToken)) {
// //             userId = jwtUtil.extractUserId(refreshToken);
// //         }

// //         if (userId == null) {
// //             System.out.println("No valid tokens provided for logout");
// //             return new Response(401, "No valid tokens provided", false);
// //         }

// //         tokenService.invalidateTokens(userId);
// //         System.out.println("Tokens invalidated for userId: " + userId);

// //         Cookie expireAccessTokenCookie = new Cookie("access_token", null);
// //         expireAccessTokenCookie.setHttpOnly(true);
// //         expireAccessTokenCookie.setSecure(false); // Enable for HTTPS in production
// //         expireAccessTokenCookie.setPath("/");
// //         expireAccessTokenCookie.setMaxAge(0);
// //         response.addCookie(expireAccessTokenCookie);

// //         Cookie expireRefreshTokenCookie = new Cookie("refresh_token", null);
// //         expireRefreshTokenCookie.setHttpOnly(true);
// //         expireRefreshTokenCookie.setSecure(false); // Enable for HTTPS in production
// //         expireRefreshTokenCookie.setPath("/");
// //         expireRefreshTokenCookie.setMaxAge(0);
// //         response.addCookie(expireRefreshTokenCookie);

// //         System.out.println("Logout successful for userId: " + userId);
// //         return new Response(200, "Logout successful", true);
// //     }


// package com.instagram.auth.login;

// import java.util.LinkedHashMap;
// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.ResponseCookie;
// import org.springframework.stereotype.Service;

// import com.instagram.auth.login.token.service.TokenService;
// import com.instagram.auth.registration.Register;
// import com.instagram.auth.registration.RegisterRepository;
// import com.instagram.response.Response;
// import com.instagram.util.JwtUtil;

// import jakarta.servlet.http.HttpServletResponse;

// @Service
// public class LoginService {

//     @Autowired
//     private RegisterRepository registerRepository;

//     @Autowired
//     private TokenService tokenService;

//     @Autowired
//     private JwtUtil jwtUtil;

//     public Response authenticate(Login login, HttpServletResponse response) {
//         // 1️⃣ Validate input
//         if (login == null || login.getIdentifier() == null || login.getIdentifier().trim().isEmpty()) {
//             return new Response(400, "Identifier is required", false);
//         }
//         if (login.getPassword() == null || login.getPassword().trim().isEmpty()) {
//             return new Response(400, "Password is required", false);
//         }

//         String identifier = login.getIdentifier().trim();
//         Optional<Register> optionalUser = registerRepository.findByPhoneNumber(identifier);
//         if (optionalUser.isEmpty()) optionalUser = registerRepository.findByUserName(identifier);
//         if (optionalUser.isEmpty()) optionalUser = registerRepository.findByEmail(identifier);
//         if (optionalUser.isEmpty()) return new Response(404, "User not found", false);

//         Register user = optionalUser.get();

//         // 2️⃣ Verify password (plain text for now)
//         if (!login.getPassword().equals(user.getPassword())) {
//             return new Response(401, "Invalid password", false);
//         }

//         // 3️⃣ Verification checks
//         if (identifier.equals(user.getPhoneNumber()) && !user.isPhoneVerified()) {
//             return new Response(403, "Phone number not verified", false);
//         }
//         if (identifier.equals(user.getEmail()) && !user.isEmailVerified()) {
//             return new Response(403, "Email not verified", false);
//         }

//         // 4️⃣ Generate JWT tokens
//         Map<String, Object> claims = new LinkedHashMap<>();
//         claims.put("userId", user.getObjectId().toString());
//         claims.put("fullName", user.getFullName());
//         claims.put("email", user.getEmail());
//         claims.put("userName", user.getUserName());
//         claims.put("phoneNumber", user.getPhoneNumber());

//         String accessToken = jwtUtil.generateAccessToken(user.getObjectId().toString(), claims);
//         String refreshToken = jwtUtil.generateRefreshToken(user.getObjectId().toString());

//         saveTokens(user.getObjectId().toString(), user.getEmail(), accessToken, refreshToken);

//         // 5️⃣ Set cookies using ResponseCookie
//         ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
//                 .httpOnly(true)
//                 .secure(false) // true in production with HTTPS
//                 .sameSite("Lax") // "Lax" works on localhost
//                 .path("/")
//                 .maxAge(15 * 60) // 15 minutes
//                 .build();

//         ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
//                 .httpOnly(true)
//                 .secure(false) // true in production
//                 .sameSite("Lax")
//                 .path("/")
//                 .maxAge(7 * 24 * 60 * 60) // 7 days
//                 .build();

//         response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
//         response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

//         // 6️⃣ Prepare response body
//         Map<String, Object> data = new LinkedHashMap<>();
//         data.put("userId", user.getObjectId().toHexString());
//         data.put("fullName", user.getFullName());
//         data.put("email", user.getEmail());
//         data.put("userName", user.getUserName());
//         data.put("phoneNumber", user.getPhoneNumber());

//         return new Response(200, "Login successful", true, data);
//     }

//     public void saveTokens(String userId, String email, String accessToken, String refreshToken) {
//         tokenService.saveToken(userId, email, accessToken, refreshToken);
//     }

//     public Response logout(jakarta.servlet.http.Cookie[] cookies, HttpServletResponse response) {
//         String accessToken = null;
//         String refreshToken = null;
    
//         if (cookies != null) {
//             for (jakarta.servlet.http.Cookie cookie : cookies) {
//                 if ("access_token".equals(cookie.getName())) accessToken = cookie.getValue();
//                 if ("refresh_token".equals(cookie.getName())) refreshToken = cookie.getValue();
//             }
//         }
    
//         String userId = null;
//         if (accessToken != null && jwtUtil.validateToken(accessToken)) {
//             userId = jwtUtil.extractUserId(accessToken);
//         } else if (refreshToken != null && jwtUtil.validateRefreshToken(refreshToken)) {
//             userId = jwtUtil.extractUserId(refreshToken);
//         }
    
//         if (userId != null) {
//             tokenService.invalidateTokens(userId);
//         }
    
//         // 🚀 Expire cookies with EXACT same settings as login
//         ResponseCookie expiredAccess = ResponseCookie.from("access_token", "")
//                 .httpOnly(true)
//                 .secure(false) // must match login
//                 .sameSite("Lax") // must match login
//                 .path("/") // must match login
//                 .maxAge(0) // delete immediately
//                 .build();
    
//         ResponseCookie expiredRefresh = ResponseCookie.from("refresh_token", "")
//                 .httpOnly(true)
//                 .secure(false)
//                 .sameSite("Lax")
//                 .path("/")
//                 .maxAge(0)
//                 .build();
    
//         response.addHeader(HttpHeaders.SET_COOKIE, expiredAccess.toString());
//         response.addHeader(HttpHeaders.SET_COOKIE, expiredRefresh.toString());
    
//         return new Response(200, "Logout successful", true);
//     }
    
// }

package com.instagram.auth.login;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.instagram.auth.login.token.service.TokenService;
import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.response.Response;
import com.instagram.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class LoginService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private JwtUtil jwtUtil;

    public Response authenticate(Login login, HttpServletResponse response) {
        // 1️⃣ Validate input
        if (login == null || login.getIdentifier() == null || login.getIdentifier().trim().isEmpty()) {
            return new Response(400, "Identifier is required", false);
        }
        if (login.getPassword() == null || login.getPassword().trim().isEmpty()) {
            return new Response(400, "Password is required", false);
        }

        String identifier = login.getIdentifier().trim();
        Optional<Register> optionalUser = registerRepository.findByPhoneNumber(identifier);
        if (optionalUser.isEmpty()) optionalUser = registerRepository.findByUserName(identifier);
        if (optionalUser.isEmpty()) optionalUser = registerRepository.findByEmail(identifier);
        if (optionalUser.isEmpty()) return new Response(404, "User not found", false);

        Register user = optionalUser.get();

        // 2️⃣ Verify password (plain text for now)
        if (!login.getPassword().equals(user.getPassword())) {
            return new Response(401, "Invalid password", false);
        }

        // 3️⃣ Verification checks
        if (identifier.equals(user.getPhoneNumber()) && !user.isPhoneVerified()) {
            return new Response(403, "Phone number not verified", false);
        }
        if (identifier.equals(user.getEmail()) && !user.isEmailVerified()) {
            return new Response(403, "Email not verified", false);
        }

        // 4️⃣ Generate JWT tokens with all user details in claims
        Map<String, Object> claims = new LinkedHashMap<>();
        claims.put("userId", user.getObjectId().toHexString());
        claims.put("fullName", user.getFullName());
        claims.put("email", user.getEmail());
        claims.put("userName", user.getUserName());
        claims.put("phoneNumber", user.getPhoneNumber());
        claims.put("isPrivate", user.isPrivate());
        claims.put("emailVerified", user.isEmailVerified());
        claims.put("phoneVerified", user.isPhoneVerified());
        claims.put("birthDate", user.getBirthDate() != null ? user.getBirthDate().toString() : null);
        claims.put("followingCount", user.getFollowingCount());
        claims.put("followerCount", user.getFollowerCount());

        String accessToken = jwtUtil.generateAccessToken(user.getObjectId().toHexString(), claims);
        String refreshToken = jwtUtil.generateRefreshToken(user.getObjectId().toHexString());

        saveTokens(user.getObjectId().toHexString(), user.getEmail(), accessToken, refreshToken);

        // 5️⃣ Set cookies using ResponseCookie
        ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(false) // true in production with HTTPS
                .sameSite("Lax") // "Lax" works on localhost
                .path("/")
                .maxAge(15 * 60) // 15 minutes
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(false) // true in production
                .sameSite("Lax")
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // 6️⃣ Prepare response body with all user details
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("userId", user.getObjectId().toHexString());
        data.put("fullName", user.getFullName());
        data.put("email", user.getEmail());
        data.put("userName", user.getUserName());
        data.put("phoneNumber", user.getPhoneNumber());
        data.put("isPrivate", user.isPrivate());
        data.put("emailVerified", user.isEmailVerified());
        data.put("phoneVerified", user.isPhoneVerified());
        data.put("birthDate", user.getBirthDate() != null ? user.getBirthDate().toString() : null);
        data.put("followingCount", user.getFollowingCount());
        data.put("followerCount", user.getFollowerCount());

        return new Response(200, "Login successful", true, data);
    }

    public void saveTokens(String userId, String email, String accessToken, String refreshToken) {
        tokenService.saveToken(userId, email, accessToken, refreshToken);
    }

    public Response logout(jakarta.servlet.http.Cookie[] cookies, HttpServletResponse response) {
        String accessToken = null;
        String refreshToken = null;
    
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                if ("access_token".equals(cookie.getName())) accessToken = cookie.getValue();
                if ("refresh_token".equals(cookie.getName())) refreshToken = cookie.getValue();
            }
        }
    
        String userId = null;
        if (accessToken != null && jwtUtil.validateToken(accessToken)) {
            userId = jwtUtil.extractUserId(accessToken);
        } else if (refreshToken != null && jwtUtil.validateRefreshToken(refreshToken)) {
            userId = jwtUtil.extractUserId(refreshToken);
        }
    
        if (userId != null) {
            tokenService.invalidateTokens(userId);
        }
    
        // Expire cookies with EXACT same settings as login
        ResponseCookie expiredAccess = ResponseCookie.from("access_token", "")
                .httpOnly(true)
                .secure(false) // must match login
                .sameSite("Lax") // must match login
                .path("/") // must match login
                .maxAge(0) // delete immediately
                .build();
    
        ResponseCookie expiredRefresh = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
    
        response.addHeader(HttpHeaders.SET_COOKIE, expiredAccess.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, expiredRefresh.toString());
    
        return new Response(200, "Logout successful", true);
    }
    
}