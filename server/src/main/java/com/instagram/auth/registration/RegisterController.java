

package com.instagram.auth.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.auth.registration.Service.SmsService;
import com.instagram.response.Response;

@RestController
@RequestMapping("/api/v1/auth")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private SmsService smsService;

    @PostMapping("/send/otp")
    public ResponseEntity<Response> sendOtp(@RequestBody Register register) {
        try {
            String otp = registerService.createOtp(register);
            Response response = smsService.sendOtp(register.getPhoneNumber(), otp);
            return ResponseEntity.status(response.getStatuscode()).body(response);
        } catch (Exception e) {
            System.err.println("Error sending OTP: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(new Response(500, "Internal server error: " + e.getMessage(), false));
        }
    }

    @PostMapping("/verify/otp")
    public ResponseEntity<Response> verifyOtp(@RequestBody Register register) {
        try {
            Response response = smsService.verify(register);
            return ResponseEntity.status(response.getStatuscode()).body(response);
        } catch (Exception e) {
            System.err.println("Error verifying OTP: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(new Response(500, "Internal server error: " + e.getMessage(), false));
        }
    }
}