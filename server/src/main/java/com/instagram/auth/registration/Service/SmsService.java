
// package com.instagram.auth.registration.Service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;

// import com.instagram.auth.registration.Register;
// import com.instagram.auth.registration.RegisterRepository;
// import com.instagram.auth.registration.otp.otpphonenumber.Otp;
// import com.instagram.auth.registration.otp.otpphonenumber.OtpRepository;
// import com.instagram.response.Response;
// import com.twilio.Twilio;
// import com.twilio.rest.api.v2010.account.Message;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class SmsService {

//     @Value("${twilio.account.sid}")
//     private String accountSid;

//     @Value("${twilio.auth.token}")
//     private String authToken;

//     @Value("${twilio.phone.number}")
//     private String twilioPhoneNumber;

//     @Autowired
//     private RegisterRepository registerRepository;

//     @Autowired
//     private OtpRepository otpRepository;

   

//     public Response sendOtp(String phoneNumber, String otp) {
//         try {
//             Twilio.init(accountSid, authToken);
//             Message.creator(
//                 new com.twilio.type.PhoneNumber("+" + phoneNumber),
//                 new com.twilio.type.PhoneNumber(twilioPhoneNumber),
//                 "Your OTP code is: " + otp
//             ).create();

//             return new Response(200, "OTP sent successfully", true, null);
//         } catch (Exception e) {
//             return new Response(500, "Failed to send OTP: " + e.getMessage(), false, null);
//         }
//     }

//       public Response phoneOtpVerify(Register register) {
//     String phoneNumber = register.getPhoneNumber();
//     String inputOtp = register.getOtp();

//     // Check for missing phone or OTP
//     if (phoneNumber == null || inputOtp == null) {
//         return new Response(400, "Phone number and OTP are required", false, null);
//     }

//     // Get the most recent OTP entry for this phone number
//     List<Otp> otpRecords = otpRepository.findByPhoneNumber(phoneNumber);
//     if (otpRecords.isEmpty()) {
//         return new Response(404, "OTP not found", false, null);
//     }

//     Otp latestOtp = otpRecords.get(otpRecords.size() - 1);

//     // Match OTP
//     if (inputOtp.equals(latestOtp.getOtp())) {
//         // ✅ Update phoneVerified = true (optional enhancement)
//         Optional<Register> optionalRegister = registerRepository.findByPhoneNumber(phoneNumber);
//         if (optionalRegister.isPresent()) {
//             Register foundRegister = optionalRegister.get();
//             foundRegister.setPhoneVerified(true);
//             foundRegister.setUserId(foundRegister.getObjectId().toHexString());
//              // Add this field in Register model
//             registerRepository.save(foundRegister);
//         }

//         return new Response(200, "Phone OTP verified successfully", true, null);
//     } else {
//         return new Response(400, "Invalid OTP", false, null);
//     }
// }



// }


package com.instagram.auth.registration.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.auth.registration.otp.otpphonenumber.Otp;
import com.instagram.auth.registration.otp.otpphonenumber.OtpRepository;
import com.instagram.response.Response;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private OtpRepository otpRepository;

   

    public Response sendOtp(String phoneNumber, String otp) {
        try {
            Twilio.init(accountSid, authToken);
            Message.creator(
                new com.twilio.type.PhoneNumber("+" + phoneNumber),
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                "Your OTP code is: " + otp
            ).create();

            return new Response(200, "OTP sent successfully", true, null);
        } catch (Exception e) {
            return new Response(500, "Failed to send OTP: " + e.getMessage(), false, null);
        }
    }

      public Response phoneOtpVerify(Register register) {
    String phoneNumber = register.getPhoneNumber();
    String inputOtp = register.getOtp();

    // Check for missing phone or OTP
    if (phoneNumber == null || inputOtp == null) {
        return new Response(400, "Phone number and OTP are required", false, null);
    }

    // Get the most recent OTP entry for this phone number
    List<Otp> otpRecords = otpRepository.findByPhoneNumber(phoneNumber);
    if (otpRecords.isEmpty()) {
        return new Response(404, "OTP not found", false, null);
    }

    Otp latestOtp = otpRecords.get(otpRecords.size() - 1);

    // Match OTP
    if (inputOtp.equals(latestOtp.getOtp())) {
        // ✅ Update phoneVerified = true (optional enhancement)
        Optional<Register> optionalRegister = registerRepository.findByPhoneNumber(phoneNumber);
        if (optionalRegister.isPresent()) {
            Register foundRegister = optionalRegister.get();
            foundRegister.setPhoneVerified(true);
            foundRegister.setUserId(foundRegister.getObjectId().toHexString());
             // Add this field in Register model
            registerRepository.save(foundRegister);
        }

        return new Response(200, "Phone OTP verified successfully", true, null);
    } else {
        return new Response(400, "Invalid OTP", false, null);
    }
}



}