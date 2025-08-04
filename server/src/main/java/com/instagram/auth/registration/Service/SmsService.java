
package com.instagram.auth.registration.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

<<<<<<< HEAD:server/src/main/java/com/instagram/auth/registration/Service/SmsService.java
import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.auth.registration.RegisterService;
import com.instagram.response.Response;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

=======
import com.instagram.Registration.Register;
import com.instagram.Registration.RegisterRepository;
import com.instagram.Registration.RegisterService;
import com.instagram.Registration.Otp.OtpPhoneNumber.Otp;
import com.instagram.Registration.Otp.OtpPhoneNumber.OtpRepository;
import com.instagram.Response.Response;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

import java.util.List;
import java.util.Optional;

>>>>>>> b4c607ae562b3df11931d35453c07eca8c71f683:server/src/main/java/com/instagram/Registration/Service/SmsService.java
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
                    "Your OTP code is: " + otp)
                    .create();
            System.out.println("OTP sent to: " + phoneNumber);
            return new Response(200, "OTP sent successfully", true, null);
        } catch (Exception e) {
            System.err.println("Failed to send OTP to " + phoneNumber + ": " + e.getMessage());
            return new Response(500, "Failed to send OTP: " + e.getMessage(), false, null);
        }
    }

<<<<<<< HEAD:server/src/main/java/com/instagram/auth/registration/Service/SmsService.java
    public Response verify(Register register) {
        String phoneNumber = register.getPhoneNumber();
        String inputOtp = register.getOtp();
=======
      public Response phoneOtpVerify(Register register) {
    String phoneNumber = register.getPhoneNumber();
    String inputOtp = register.getOtp();
>>>>>>> b4c607ae562b3df11931d35453c07eca8c71f683:server/src/main/java/com/instagram/Registration/Service/SmsService.java

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
            registerRepository.deleteByPhoneNumber(phoneNumber);
            Register foundRegister = optionalRegister.get();
            foundRegister.setPhoneVerified(true); // Add this field in Register model
            registerRepository.save(foundRegister);
        }

<<<<<<< HEAD:server/src/main/java/com/instagram/auth/registration/Service/SmsService.java
        Register user = optionalRegister.get();
        String storedOtp = user.getOtp();

        if (inputOtp.equals(storedOtp)) {
            user.setPhoneVerified(true);
            user.setOtp(null);
            registerRepository.save(user);
            System.out.println("OTP verified for: " + phoneNumber);
            return new Response(200, "OTP verified successfully", true, user);
        } else {
            System.out.println("Invalid OTP for: " + phoneNumber);
            return new Response(400, "Invalid OTP", false, null);
        }
    }
}
=======
        return new Response(200, "Phone OTP verified successfully", true, null);
    } else {
        return new Response(400, "Invalid OTP", false, null);
    }
}



}
>>>>>>> b4c607ae562b3df11931d35453c07eca8c71f683:server/src/main/java/com/instagram/Registration/Service/SmsService.java
