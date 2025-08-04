package com.instagram.Registration;

import java.security.SecureRandom;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.Registration.Otp.OtpEmail.EmailOtpService;
import com.instagram.Registration.Otp.OtpPhoneNumber.OtpService;
import com.instagram.Registration.Service.EmailService;
import com.instagram.Registration.Service.SmsService;
import com.instagram.Response.Response;


@Service
public class RegisterService {
    private final SecureRandom random = new SecureRandom();

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private OtpService optService;

    @Autowired
    private EmailOtpService emailOtpService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private EmailService emailService;

   public Response sendOtpOrEmailOtp(Register register) {
    if (register == null) {
        return new Response(400, "Request body is missing", false, null);
    }

    String phone = register.getPhoneNumber();
    String email = register.getEmail();

    boolean phoneExists = (phone != null && registerRepository.findByPhoneNumber(phone).isPresent());
    boolean emailExists = (email != null && registerRepository.findByEmail(email).isPresent());

    if (phoneExists || emailExists) {
        return new Response(409, "Phone number or email already registered", false, null);
    }

    if (phone != null && !phone.trim().isEmpty()) {
        String otp = createOtp(register); // saves Register + otp
        return smsService.sendOtp(phone, otp); // builds and returns Response
    }

    if (email != null && !email.trim().isEmpty()) {
        String otp = createEmailOtp(register); // saves Register + otp
        String subject = "Your OTP Code";
        String message = "Your OTP code is: " + otp;
        emailService.sendEmail(email, subject, message); // send mail
        return new Response(200, "OTP sent to email successfully", true, null); // reused response
    }

    return new Response(400, "Either phone number or email is required", false, null);
   }







     public String createOtp(Register register) {
            if (register == null || register.getPhoneNumber() == null || register.getPhoneNumber().trim().isEmpty()) {
                throw new IllegalArgumentException("Phone number is required.");
            }

            String phoneNumber = register.getPhoneNumber().trim();

                registerRepository.deleteByPhoneNumber(phoneNumber);
            register.setPhoneVerified(false);
             registerRepository.save(register);

            String otp = String.format("%06d", random.nextInt(1_000_000));
            optService.saveOtp(phoneNumber, otp);

            return otp;
        }

            
         public String createEmailOtp(Register register) {
            if (register == null || register.getEmail() == null || register.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required.");
            }

            String email = register.getEmail().trim();
            registerRepository.deleteByEmail(email);
            register.setEmailVerified(false);
            registerRepository.save(register);

            String otp = String.format("%06d", random.nextInt(1_000_000));
            emailOtpService.saveOtp(email, otp);
            return otp;
        }




    
}
