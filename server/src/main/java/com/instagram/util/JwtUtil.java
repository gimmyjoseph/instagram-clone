// // // package com.instagram.util;


// // // import java.nio.charset.StandardCharsets;
// // // import java.security.Key;
// // // import java.util.Date;
// // // import java.util.Map;
// // // import java.util.UUID;
// // // import java.util.logging.Logger;

// // // import javax.crypto.spec.SecretKeySpec;

// // // import org.springframework.beans.factory.annotation.Value;
// // // import org.springframework.stereotype.Component;

// // // import io.jsonwebtoken.JwtException;
// // // import io.jsonwebtoken.Jwts;
// // // import io.jsonwebtoken.SignatureAlgorithm;

// // // @Component
// // // public class JwtUtil {

// // //     private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());

// // //     private final Key key;
// // //     private final long accessExpirationTime;
// // //     private final long refreshExpirationTime;

// // //     public JwtUtil(@Value("${jwt.secret}") String secretKey,
// // //             @Value("${jwt.access-token-expiration}") long accessExpirationTime,
// // //             @Value("${jwt.refresh-token-expiration}") long refreshExpirationTime) {
// // //         this.key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
// // //         this.accessExpirationTime = accessExpirationTime;
// // //         this.refreshExpirationTime = refreshExpirationTime;
// // //         LOGGER.info("JwtUtil: Initialized with secret key and expiration times - access: " + accessExpirationTime
// // //                 + "ms, refresh: " + refreshExpirationTime + "ms");
// // //     }

// // //     public String generateAccessToken(String userId, Map<String, Object> claims) {
// // //         claims.put("type", "access");
// // //         LOGGER.info("JwtUtil: Generating access token for userId: " + userId + ", claims: " + claims);
// // //         return Jwts.builder()
// // //                 .setClaims(claims)
// // //                 .setSubject(userId)
// // //                 .setId(UUID.randomUUID().toString())
// // //                 .setIssuedAt(new Date())
// // //                 .setExpiration(new Date(System.currentTimeMillis() + accessExpirationTime))
// // //                 .signWith(key)
// // //                 .compact();
// // //     }

// // //     public String generateRefreshToken(String userId) {
// // //         LOGGER.info("JwtUtil: Generating refresh token for userId: " + userId);
// // //         return Jwts.builder()
// // //                 .setSubject(userId)
// // //                 .setId(UUID.randomUUID().toString())
// // //                 .claim("type", "refresh")
// // //                 .setIssuedAt(new Date())
// // //                 .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
// // //                 .signWith(key)
// // //                 .compact();
// // //     }

// // //     public boolean validateToken(String token) {
// // //         try {
// // //             Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
// // //             LOGGER.info("JwtUtil: Token validated successfully");
// // //             return true;
// // //         } catch (JwtException | IllegalArgumentException e) {
// // //             LOGGER.warning("JwtUtil: Token validation failed for token: " + token + ", error: " + e.getMessage());
// // //             return false;
// // //         }
// // //     }

// // //     public boolean validateRefreshToken(String token) {
// // //         LOGGER.info("JwtUtil: Validating refresh token");
// // //         return validateToken(token);
// // //     }

// // //     public String extractUserId(String token) {
// // //         LOGGER.info("JwtUtil: Extracting userId from token");
// // //         try {
// // //             String userId = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody()
// // //                     .getSubject();
// // //             LOGGER.info("JwtUtil: Extracted userId: " + userId);
// // //             return userId;
// // //         } catch (JwtException | IllegalArgumentException e) {
// // //             LOGGER.warning("JwtUtil: Failed to extract userId from token: " + token + ", error: " + e.getMessage());
// // //             throw new RuntimeException("Failed to extract userId: " + e.getMessage());
// // //         }
// // //     }

// // //     public Map<String, Object> decodeToken(String token) {
// // //         LOGGER.info("JwtUtil: Decoding token");
// // //         try {
// // //             Map<String, Object> claims = Jwts.parserBuilder()
// // //                     .setSigningKey(key)
// // //                     .build()
// // //                     .parseClaimsJws(token)
// // //                     .getBody();
// // //             LOGGER.info("JwtUtil: Decoded claims: " + claims);
// // //             return claims;
// // //         } catch (JwtException | IllegalArgumentException e) {
// // //             LOGGER.severe("JwtUtil: Failed to decode token: " + token + ", error: " + e.getMessage());
// // //             throw new RuntimeException("Failed to decode token: " + e.getMessage());
// // //         }
// // //     }

// // //     public long getAccessExpirationTime() {
// // //         return accessExpirationTime / 1000;
// // //     }

// // //     public long getRefreshExpirationTime() {
// // //         return refreshExpirationTime / 1000;
// // //     }
// // // }
// // package com.instagram.util;

// // import java.nio.charset.StandardCharsets;
// // import java.security.Key;
// // import java.util.Date;
// // import java.util.Map;
// // import java.util.UUID;
// // import java.util.logging.Logger;

// // import javax.crypto.spec.SecretKeySpec;

// // import org.springframework.beans.factory.annotation.Value;
// // import org.springframework.stereotype.Component;

// // import io.jsonwebtoken.JwtException;
// // import io.jsonwebtoken.Jwts;
// // import io.jsonwebtoken.SignatureAlgorithm;

// // @Component
// // public class JwtUtil {

// //     private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());

// //     private final Key key;
// //     private final long accessExpirationTime;
// //     private final long refreshExpirationTime;

// //     public JwtUtil(@Value("${jwt.secret}") String secretKey,
// //                    @Value("${jwt.access-token-expiration}") long accessExpirationTime,
// //                    @Value("${jwt.refresh-token-expiration}") long refreshExpirationTime) {
// //         this.key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
// //         this.accessExpirationTime = accessExpirationTime;
// //         this.refreshExpirationTime = refreshExpirationTime;
// //         LOGGER.info("JwtUtil: Initialized with secret key and expiration times - access: " + accessExpirationTime
// //                 + "ms, refresh: " + refreshExpirationTime + "ms");
// //     }

// //     public String generateAccessToken(String userId, Map<String, Object> claims) {
// //         claims.put("type", "access");
// //         claims.put("userId", userId); // ✅ Explicitly include userId in claims
// //         LOGGER.info("JwtUtil: Generating access token for userId: " + userId + ", claims: " + claims);
// //         return Jwts.builder()
// //                 .setClaims(claims)
// //                 .setSubject(userId) // keep userId as subject too
// //                 .setId(UUID.randomUUID().toString())
// //                 .setIssuedAt(new Date())
// //                 .setExpiration(new Date(System.currentTimeMillis() + accessExpirationTime))
// //                 .signWith(key)
// //                 .compact();
// //     }

// //     public String generateRefreshToken(String userId) {
// //         LOGGER.info("JwtUtil: Generating refresh token for userId: " + userId);
// //         return Jwts.builder()
// //                 .setSubject(userId)
// //                 .setId(UUID.randomUUID().toString())
// //                 .claim("type", "refresh")
// //                 .claim("userId", userId) // ✅ add userId here too
// //                 .setIssuedAt(new Date())
// //                 .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
// //                 .signWith(key)
// //                 .compact();
// //     }

// //     public boolean validateToken(String token) {
// //         try {
// //             Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
// //             LOGGER.info("JwtUtil: Token validated successfully");
// //             return true;
// //         } catch (JwtException | IllegalArgumentException e) {
// //             LOGGER.warning("JwtUtil: Token validation failed for token: " + token + ", error: " + e.getMessage());
// //             return false;
// //         }
// //     }

// //     public boolean validateRefreshToken(String token) {
// //         LOGGER.info("JwtUtil: Validating refresh token");
// //         return validateToken(token);
// //     }

// //     public String extractUserId(String token) {
// //         LOGGER.info("JwtUtil: Extracting userId from token");
// //         try {
// //             String userId = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody()
// //                     .getSubject();
// //             LOGGER.info("JwtUtil: Extracted userId: " + userId);
// //             return userId;
// //         } catch (JwtException | IllegalArgumentException e) {
// //             LOGGER.warning("JwtUtil: Failed to extract userId from token: " + token + ", error: " + e.getMessage());
// //             throw new RuntimeException("Failed to extract userId: " + e.getMessage());
// //         }
// //     }

// //     public Map<String, Object> decodeToken(String token) {
// //         LOGGER.info("JwtUtil: Decoding token");
// //         try {
// //             Map<String, Object> claims = Jwts.parserBuilder()
// //                     .setSigningKey(key)
// //                     .build()
// //                     .parseClaimsJws(token)
// //                     .getBody();
// //             LOGGER.info("JwtUtil: Decoded claims: " + claims);
// //             return claims;
// //         } catch (JwtException | IllegalArgumentException e) {
// //             LOGGER.severe("JwtUtil: Failed to decode token: " + token + ", error: " + e.getMessage());
// //             throw new RuntimeException("Failed to decode token: " + e.getMessage());
// //         }
// //     }

// //     public long getAccessExpirationTime() {
// //         return accessExpirationTime / 1000;
// //     }

// //     public long getRefreshExpirationTime() {
// //         return refreshExpirationTime / 1000;
// //     }
// // }

// package com.instagram.util;


// import java.nio.charset.StandardCharsets;
// import java.security.Key;
// import java.util.Date;
// import java.util.Map;
// import java.util.UUID;
// import java.util.logging.Logger;

// import javax.crypto.spec.SecretKeySpec;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import io.jsonwebtoken.JwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;

// @Component
// public class JwtUtil {

//     private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());

//     private final Key key;
//     private final long accessExpirationTime;
//     private final long refreshExpirationTime;

//     public JwtUtil(@Value("${jwt.secret}") String secretKey,
//             @Value("${jwt.access-token-expiration}") long accessExpirationTime,
//             @Value("${jwt.refresh-token-expiration}") long refreshExpirationTime) {
//         this.key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
//         this.accessExpirationTime = accessExpirationTime;
//         this.refreshExpirationTime = refreshExpirationTime;
//         LOGGER.info("JwtUtil: Initialized with secret key and expiration times - access: " + accessExpirationTime
//                 + "ms, refresh: " + refreshExpirationTime + "ms");
//     }

//     public String generateAccessToken(String userId, Map<String, Object> claims) {
//         claims.put("type", "access");
//         LOGGER.info("JwtUtil: Generating access token for userId: " + userId + ", claims: " + claims);
//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setSubject(userId)
//                 .setId(UUID.randomUUID().toString())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + accessExpirationTime))
//                 .signWith(key)
//                 .compact();
//     }

//     public String generateRefreshToken(String userId) {
//         LOGGER.info("JwtUtil: Generating refresh token for userId: " + userId);
//         return Jwts.builder()
//                 .setSubject(userId)
//                 .setId(UUID.randomUUID().toString())
//                 .claim("type", "refresh")
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
//                 .signWith(key)
//                 .compact();
//     }

//     public boolean validateToken(String token) {
//         try {
//             Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//             LOGGER.info("JwtUtil: Token validated successfully");
//             return true;
//         } catch (JwtException | IllegalArgumentException e) {
//             LOGGER.warning("JwtUtil: Token validation failed for token: " + token + ", error: " + e.getMessage());
//             return false;
//         }
//     }

//     public boolean validateRefreshToken(String token) {
//         LOGGER.info("JwtUtil: Validating refresh token");
//         return validateToken(token);
//     }

//     public String extractUserId(String token) {
//         LOGGER.info("JwtUtil: Extracting userId from token");
//         try {
//             String userId = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody()
//                     .getSubject();
//             LOGGER.info("JwtUtil: Extracted userId: " + userId);
//             return userId;
//         } catch (JwtException | IllegalArgumentException e) {
//             LOGGER.warning("JwtUtil: Failed to extract userId from token: " + token + ", error: " + e.getMessage());
//             throw new RuntimeException("Failed to extract userId: " + e.getMessage());
//         }
//     }

//     public Map<String, Object> decodeToken(String token) {
//         LOGGER.info("JwtUtil: Decoding token");
//         try {
//             Map<String, Object> claims = Jwts.parserBuilder()
//                     .setSigningKey(key)
//                     .build()
//                     .parseClaimsJws(token)
//                     .getBody();
//             LOGGER.info("JwtUtil: Decoded claims: " + claims);
//             return claims;
//         } catch (JwtException | IllegalArgumentException e) {
//             LOGGER.severe("JwtUtil: Failed to decode token: " + token + ", error: " + e.getMessage());
//             throw new RuntimeException("Failed to decode token: " + e.getMessage());
//         }
//     }

//     public long getAccessExpirationTime() {
//         return accessExpirationTime / 1000;
//     }

//     public long getRefreshExpirationTime() {
//         return refreshExpirationTime / 1000;
//     }
// }

// src/main/java/com/instagram/util/JwtUtil.java
package com.instagram.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());
    private final Key key;
    private final long accessExpirationTime;
    private final long refreshExpirationTime;

    public JwtUtil(@Value("${jwt.secret}") String secretKey,
                   @Value("${jwt.access-token-expiration}") long accessExpirationTime,
                   @Value("${jwt.refresh-token-expiration}") long refreshExpirationTime) {
        this.key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
        this.accessExpirationTime = accessExpirationTime;
        this.refreshExpirationTime = refreshExpirationTime;
    }

    public String generateAccessToken(String userId, Map<String, Object> claims) {
        claims.put("type", "access");
        claims.put("userId", userId);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessExpirationTime))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setId(UUID.randomUUID().toString())
                .claim("type", "refresh")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public boolean validateRefreshToken(String token) {
        return validateToken(token);
    }

    public String extractUserId(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody()
                    .getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Failed to extract userId: " + e.getMessage());
        }
    }

    public Map<String, Object> decodeToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public long getAccessExpirationTime() {
        return accessExpirationTime / 1000;
    }

    public long getRefreshExpirationTime() {
        return refreshExpirationTime / 1000;
    }
}