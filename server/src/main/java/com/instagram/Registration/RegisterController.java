
package com.instagram.Registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.instagram.Registration.Service.EmailService;
import com.instagram.Registration.Service.SmsService;
import com.instagram.Response.Response;

@RestController
@RequestMapping("/api")
public class RegisterController {

    

    @Autowired
    private RegisterService registerService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private EmailService emailService;

   


//   
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

