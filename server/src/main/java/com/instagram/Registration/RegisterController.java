// package com.instagram.Registration;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.instagram.Registration.Service.SmsService;
// import com.instagram.Response.Response;

// @RestController
// @RequestMapping("/api")
// public class RegisterController {
    
//     @Autowired
//     private RegisterService registerService;

//     @Autowired
//     private SmsService smsService;

//     @PostMapping("/sent/number")
//     public ResponseEntity<Response> sentOtp(@RequestBody Register register){
//         String otp=registerService.createOtp(register);
//        Response response= smsService.sendOtp(register.getphoneNumber(),otp);

//     }
//     @PostMapping("/verify/phoneNumber")
//     public ResponseEntity<Response> verify(String phoneNumber,String otp){
//        Response response= smsService.verify(phoneNumber,otp);
//     }
// }
package com.instagram.Registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.instagram.Registration.Service.SmsService;
import com.instagram.Response.Response;

@RestController
@RequestMapping("/api")
public class RegisterController {

    

    @Autowired
    private RegisterService registerService;

    @Autowired
    private SmsService smsService;

    @PostMapping("/send/otp")
    public ResponseEntity<Response> sendOtp(@RequestBody Register register) {
        String otp = registerService.createOtp(register);
        Response response = smsService.sendOtp(register.getPhoneNumber(),otp);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @PostMapping("/verify/otp")
    public ResponseEntity<Response> verifyOtp(@RequestBody Register register) {
        Response response = smsService.verify(register);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }
}

