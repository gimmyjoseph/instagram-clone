
package com.instagram.auth.registration;


import java.security.SecureRandom;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Service.EmailService;
import com.instagram.auth.registration.Service.SmsService;
import com.instagram.auth.registration.otp.otpemail.EmailOtpService;
import com.instagram.auth.registration.otp.otpphonenumber.OtpService;
import com.instagram.response.Response;


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
        String otp = createPhoneOtp(register); // saves Register + otp
        return smsService.sendOtp(phone, otp); // builds and returns Response
    }

    if (email != null && !email.trim().isEmpty()) {
        String otp = createEmailOtp(register); // saves Register + otp
        String subject = "Your OTP Code";
        String message = "Your OTP code is: " + otp;
        emailService.sendEmail(email, subject, message); // send mail
        return new Response(200, "OTP sent to email successfully", true, register); // reused response
    }

    return new Response(400, "Either phone number or email is required", false, null);
   }

    public String createPhoneOtp(Register register) {
    if (register == null || register.getPhoneNumber() == null || register.getPhoneNumber().trim().isEmpty()) {
        throw new IllegalArgumentException("Phone number is required.");
    }

    String phoneNumber = register.getPhoneNumber().trim();

    // Check if user already exists
    Optional<Register> optional = registerRepository.findByPhoneNumber(phoneNumber);

    Register userToSave;

    if (optional.isPresent()) {
        // Existing user found, update flags only
        userToSave = optional.get();
        userToSave.setPhoneVerified(false);
        // Optionally update other fields from 'register' if needed
    } else {
        // New user
        register.setPhoneNumber(phoneNumber);
        register.setPhoneVerified(false);
        userToSave = registerRepository.save(register); // Save first to get ObjectId
    }

    // Set userId if not already set
    if (userToSave.getUserId() == null || userToSave.getUserId().isEmpty()) {
        userToSave.setUserId(userToSave.getObjectId().toHexString());
        registerRepository.save(userToSave); // Save again with userId
    }

    // Generate OTP
    String otp = String.format("%06d", random.nextInt(1_000_000));
    optService.saveOtp(phoneNumber, otp);

    return otp;
}


    public String createEmailOtp(Register register) {
    if (register == null || register.getEmail() == null || register.getEmail().trim().isEmpty()) {
        throw new IllegalArgumentException("Email is required.");
    }

    String email = register.getEmail().trim();

    // Try to find existing user by email
    Optional<Register> optional = registerRepository.findByEmail(email);

    Register userToSave;

    if (optional.isPresent()) {
        // Update existing user instead of deleting
        userToSave = optional.get();
        userToSave.setEmailVerified(false);
        userToSave.setPhoneVerified(false);
        // Optionally update other fields from 'register' if needed
    } else {
        // Save new user
        register.setEmail(email);
        register.setEmailVerified(false);
        register.setPhoneVerified(false);
        userToSave = registerRepository.save(register); // Save first to get ObjectId
    }

    // Set userId if not already set
    if (userToSave.getUserId() == null || userToSave.getUserId().isEmpty()) {
        userToSave.setUserId(userToSave.getObjectId().toHexString());
        registerRepository.save(userToSave); // Update with userId
    }

    // Generate and save OTP
    String otp = String.format("%06d", random.nextInt(1_000_000));
    emailOtpService.saveOtp(email, otp);

    return otp;
}


      public Response get(String id) {
    Optional<Register> optionalUser = registerRepository.findById(new ObjectId(id));
    if (optionalUser.isPresent()) {
        return new Response(200, "User found", true, optionalUser.get());
    } else {
        return new Response(404, "User not found", false, null);
    }

   
}
            
            public Response birth(Register register) {
    // 1. Check if either email or phone is provided
    boolean hasEmail = register.getEmail() != null && !register.getEmail().isEmpty();
    boolean hasPhone = register.getPhoneNumber() != null && !register.getPhoneNumber().isEmpty();

    if (!hasEmail && !hasPhone) {
        return new Response(400, "Email or phone number is required", false, null);
    }

    // 2. Find the existing user by email or phone
    Optional<Register> optionalRegister = hasEmail
        ? registerRepository.findByEmail(register.getEmail())
        : registerRepository.findByPhoneNumber(register.getPhoneNumber());

    if (optionalRegister.isEmpty()) {
        return new Response(404, "User not found", false, null);
    }

    Register existingUser = optionalRegister.get();

    // 3. Check if birthDate is present
    if (register.getBirthDate() == null) {
        return new Response(400, "Birth date is required", false, null);
    }

    // 4. Update only the birthDate field on the existing user object
    existingUser.setBirthDate(register.getBirthDate());

    // 5. Save the existing user (this retains ObjectId and prevents duplication)
    registerRepository.save(existingUser);

    return new Response(200, "Birthday added successfully", true, existingUser);
}

        // public Response getNewOtp(Register register){
        //     boolean hasEmail=register.getEmail()!=null && !register.getEmail().isEmpty();
        //     boolean hasPhone=register.getPhoneNumber()=null && !register.getPhoneNumber().isEmpty();

        //     if (!hasEmail && !hasPhone) {
        // return new Response(400, "Email or phone number is required", false, null);
        //      }

        //      Optional<Register> optionalUser=hasEmail? registerRepository.findByEmail(register.getEmail())
        //      :registerRepository.findByPhoneNumber(register.getPhoneNumber());

        //      if(optionalUser.isEmpty()){
        //          return new Response(404, "User not found", false, null);
        //      }

        //      Register existingUser=optionalUser.get();





        // }

       

    
}
