
package com.instagram.auth.registration;

import java.security.SecureRandom;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final SecureRandom random = new SecureRandom();

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String createOtp(Register register) {
        // Validate input
        if (register == null || register.getPhoneNumber() == null || register.getPhoneNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required.");
        }
        if (register.getPassword() == null || register.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }
        if (register.getUserName() == null || register.getUserName().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required.");
        }
        if (register.getEmail() == null || register.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required.");
        }

        // Normalize phone number (remove +, spaces, dashes)
        String normalizedPhoneNumber = register.getPhoneNumber().replaceAll("[+\\s-]", "");
        register.setPhoneNumber(normalizedPhoneNumber);

        // Check for existing user
        Optional<Register> existingByPhone = registerRepository.findByPhoneNumber(normalizedPhoneNumber);
        Optional<Register> existingByUserName = registerRepository.findByUserName(register.getUserName());
        Optional<Register> existingByEmail = registerRepository.findByEmail(register.getEmail());

        if (existingByPhone.isPresent() || existingByUserName.isPresent() || existingByEmail.isPresent()) {
            throw new IllegalArgumentException("User already exists with provided phone number, username, or email.");
        }

        // Generate 6-digit OTP
        String otp = String.format("%06d", random.nextInt(1_000_000));

        // Set OTP, hashed password, and verification status
        register.setOtp(otp);
        register.setPhoneVerified(false);
        register.setPassword(passwordEncoder.encode(register.getPassword())); // Hash password
        register.setObjectId(null); // Ensure MongoDB generates _id

        // Save the document
        Register savedRegister = registerRepository.save(register);
        System.out.println("User saved: email=" + savedRegister.getEmail() + ", objectId=" + 
                          (savedRegister.getObjectId() != null ? savedRegister.getObjectId().toString() : "null"));

        return otp;
    }
}