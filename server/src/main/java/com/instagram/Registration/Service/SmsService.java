package com.instagram.Registration.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.instagram.Registration.Register;
import com.instagram.Registration.RegisterRepository;
import com.instagram.Registration.RegisterService;
import com.instagram.Response.Response;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

import java.util.Optional;

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

    /**
     * Sends an OTP to the specified phone number using Twilio.
     */
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

    /**
     * Verifies the user's OTP and marks their phone as verified if it matches.
     */
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
            user.setOtp(null); // Optional: clear OTP after successful verification
            registerRepository.save(user);
            return new Response(200, "OTP verified successfully", true, user);
        } else {
            return new Response(400, "Invalid OTP", false, null);
        }
    }
}
