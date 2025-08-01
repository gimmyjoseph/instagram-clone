
package com.instagram.auth.registration.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.auth.registration.RegisterService;
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
    private RegisterService registerService;

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

    public Response verify(Register register) {
        String phoneNumber = register.getPhoneNumber();
        String inputOtp = register.getOtp();

        if (phoneNumber == null || inputOtp == null) {
            return new Response(400, "Phone number and OTP are required", false, null);
        }

        Optional<Register> optionalRegister = registerRepository.findByPhoneNumber(phoneNumber);

        if (optionalRegister.isEmpty()) {
            return new Response(404, "User not found", false, null);
        }

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