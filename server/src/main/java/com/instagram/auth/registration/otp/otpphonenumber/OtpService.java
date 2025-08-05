package com.instagram.auth.registration.otp.otpphonenumber;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    public String saveOtp(String phoneNumber, String otp) {
        // Delete any existing OTPs for the phone number
        otpRepository.deleteAll(otpRepository.findByPhoneNumber(phoneNumber));

        // Calculate expiration time (2 minutes from now)
        Date now = new Date();
        Date expiry = new Date(System.currentTimeMillis() + 2 * 60 * 1000); // 2 minutes in ms

        // Create new OTP document
        Otp newOtp = new Otp();
        newOtp.setPhoneNumber(phoneNumber);
        newOtp.setOtp(otp);
        newOtp.setCreatedAt(now);
        newOtp.setExpiresAt(expiry);

        // Save to database
        otpRepository.save(newOtp);

        return otp;
    }
}
