package com.instagram.Registration;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RegisterService {
    private final SecureRandom random = new SecureRandom();

    @Autowired
    private RegisterRepository registerRepository;

    public String createOtp(Register register) {
    // Validate phone number
    if (register == null || register.getPhoneNumber() == null || register.getPhoneNumber().trim().isEmpty()) {
        throw new IllegalArgumentException("Phone number is required.");
    }

    // Generate 6-digit OTP
    String otp = String.format("%06d", random.nextInt(1_000_000));

    // Look for existing user
    Optional<Register> existingUser = registerRepository.findByPhoneNumber(register.getPhoneNumber());

    if (existingUser.isPresent()) {
        // Update OTP for existing user
        Register user = existingUser.get();
        user.setOtp(otp);
        user.setPhoneVerified(false);
        registerRepository.save(user);
    } else {
        // Set OTP and verification status for new user
        register.setOtp(otp);
        register.setPhoneVerified(false);
        registerRepository.save(register);
    }

    return otp;
}


    
}
