package com.instagram.auth.registration.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.auth.registration.otp.otpemail.EmailOtp;
import com.instagram.auth.registration.otp.otpemail.EmailOtpRepository;
import com.instagram.response.Response;

 @Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailOtpRepository emailOtpRepository;
    @Autowired
    private RegisterRepository registerRepository;

    

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("gimmyjimmygimmy@gmail.com"); // must match username
        mailSender.send(message);
    }

   public Response emailOtpVerify(Register register) {
    String email = register.getEmail();
    String inputOtp = register.getOtp();

    // Check for missing email or OTP
    if (email == null || inputOtp == null) {
        return new Response(400, "Email and OTP are required", false, null);
    }

    // Get the most recent OTP entry for this email
    List<EmailOtp> otpRecords = emailOtpRepository.findByEmail(email);
    if (otpRecords.isEmpty()) {
        return new Response(404, "OTP not found", false, null);
    }

    EmailOtp latestOtp = otpRecords.get(otpRecords.size() - 1);

    // Match OTP
    if (inputOtp.equals(latestOtp.getOtp())) {
        // ✅ Update emailVerified = true
        Optional<Register> optionalRegister = registerRepository.findByEmail(email);
        if (optionalRegister.isPresent()) {
            registerRepository.deleteByEmail(email);
            Register foundRegister = optionalRegister.get();
            foundRegister.setEmailVerified(true); // Make sure this field exists in the model
            registerRepository.save(foundRegister);
        }

        return new Response(200, "Email OTP verified successfully", true);
    } else {
        return new Response(400, "Invalid OTP", false, null);
    }
}


}



