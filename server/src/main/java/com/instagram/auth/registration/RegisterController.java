

package com.instagram.auth.registration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.auth.registration.Service.EmailService;
import com.instagram.auth.registration.Service.SmsService;

import com.instagram.response.Response;

@RestController
@RequestMapping("/api/v1/auth")
public class RegisterController {

     @Autowired
    private RegisterService registerService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private EmailService emailService;
    
        @PostMapping("/register")
        public ResponseEntity<Response> sendOtpOrEmailOtp(@RequestBody Register register) {
            Response response = registerService.sendOtpOrEmailOtp(register);
            return ResponseEntity.status(response.getStatuscode()).body(response);
        }



    @PostMapping("/verify/otp")
    public ResponseEntity<Response> verifyOtp(@RequestBody Register register) {
        Response response = smsService.phoneOtpVerify(register);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

        @PostMapping("/verify/email/otp")
        public ResponseEntity<Response> verifyEmailOtp(@RequestBody Register register) {
            Response response = emailService.emailOtpVerify(register);
            return ResponseEntity.status(response.getStatuscode()).body(response);
        }
    }