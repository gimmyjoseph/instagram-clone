
// package com.instagram.auth.registration;



// import org.bson.types.ObjectId;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.instagram.auth.registration.Service.EmailService;
// import com.instagram.auth.registration.Service.SmsService;
// import com.instagram.response.Response;

// @RestController
// @RequestMapping("/api/v1")
// public class RegisterController {

    

//     @Autowired
//     private RegisterService registerService;

//     @Autowired
//     private SmsService smsService;

//     @Autowired
//     private EmailService emailService;


//         @PostMapping("/register")
//         public ResponseEntity<Response> sendOtpOrEmailOtp(@RequestBody Register register) {
//             Response response = registerService.sendOtpOrEmailOtp(register);
//             return ResponseEntity.status(response.getStatuscode()).body(response);
//         }



//     @PostMapping("/verify/phone/otp")
//     public ResponseEntity<Response> verifyOtp(@RequestBody Register register) {
//         Response response = smsService.phoneOtpVerify(register);
//         return ResponseEntity.status(response.getStatuscode()).body(response);
//     }

//         @PostMapping("/verify/email/otp")
//         public ResponseEntity<Response> verifyEmailOtp(@RequestBody Register register) {
//             Response response = emailService.emailOtpVerify(register);
//             return ResponseEntity.status(response.getStatuscode()).body(response);
//         }

//         @GetMapping("/user/{id}")
//         public ResponseEntity<Response> getUserById(@PathVariable String id) {
//             Response response = registerService.get(id);
//             return ResponseEntity.status(response.getStatuscode()).body(response);
//         }

//         @PatchMapping("/addBirthday")
//         public ResponseEntity<Response> addBirthDay(@RequestBody Register register){
//             Response response=registerService.birth(register);
//              return ResponseEntity.status(response.getStatuscode()).body(response);
//         }
//         // @PostMapping("/resend")
//         // public ResponseEntity<Response> resent(Register register){
//         //     Response response=registerService.getNewOtp(register);
//         //     return ResponseEntity.status(response.getStatuscode()).body(response);
//         // }

//         @PatchMapping("/user/privacy/{id}")
//         public ResponseEntity<Response> updatePrivacy(@PathVariable ObjectId id,@RequestParam boolean isPrivate)
//         {
//             Response response = registerService.updatePrivacy(id, isPrivate);
//             return ResponseEntity.status(response.getStatuscode()).body(response);
//         }
//     }


package com.instagram.auth.registration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        // @PatchMapping("/user/privacy/{id}")
        // public ResponseEntity<Response> updatePrivacy(@PathVariable ObjectId id,@RequestParam boolean isPrivate)
        // {
        //     Response response = registerService.updatePrivacy(id, isPrivate);
        //     return ResponseEntity.status(response.getStatuscode()).body(response);
        // }

        @GetMapping("/allUsers")
        public ResponseEntity<Response> getListOfUsersForChat(){
            Response response=registerService.getListChat();
             return ResponseEntity.status(response.getStatuscode()).body(response);}
  
    }
