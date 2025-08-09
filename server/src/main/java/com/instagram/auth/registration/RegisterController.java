
package com.instagram.auth.registration;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.instagram.auth.registration.Service.EmailService;
import com.instagram.auth.registration.Service.SmsService;
import com.instagram.response.Response;

@RestController
@RequestMapping("/api")
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



    @PostMapping("/verify/phone/otp")
    public ResponseEntity<Response> verifyOtp(@RequestBody Register register) {
        Response response = smsService.phoneOtpVerify(register);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

        @PostMapping("/verify/email/otp")
        public ResponseEntity<Response> verifyEmailOtp(@RequestBody Register register) {
            Response response = emailService.emailOtpVerify(register);
            return ResponseEntity.status(response.getStatuscode()).body(response);
        }

        @GetMapping("/user/{id}")
        public ResponseEntity<Response> getUserById(@PathVariable String id) {
            Response response = registerService.get(id);
            return ResponseEntity.status(response.getStatuscode()).body(response);
        }

        @PatchMapping("/addBirthday")
        public ResponseEntity<Response> addBirthDay(@RequestBody Register register){
            Response response=registerService.birth(register);
             return ResponseEntity.status(response.getStatuscode()).body(response);
        }
        // @PostMapping("/resend")
        // public ResponseEntity<Response> resent(Register register){
        //     Response response=registerService.getNewOtp(register);
        //     return ResponseEntity.status(response.getStatuscode()).body(response);
        // }
  
    }

