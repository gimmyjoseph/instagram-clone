// package com.instagram.auth.registration.otp.otpemail;


// import java.util.Date;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailOtpService {

//     @Autowired
//     private EmailOtpRepository emailOtpRepository;

//     public String saveOtp(String email, String otp) {
//         // Delete existing OTPs for the email
//         emailOtpRepository.deleteAll(emailOtpRepository.findByEmail(email));

//         // Set current time and expiry time (e.g., 2 minutes later)
//         Date now = new Date();
//         Date expiry = new Date(System.currentTimeMillis() + 2 * 60 * 1000); // 2 minutes in ms

//         // Create and save new OTP
//         EmailOtp emailOtp = new EmailOtp();
//         emailOtp.setEmail(email);
//         emailOtp.setOtp(otp);
//         emailOtp.setCreatedAt(now);
//         emailOtp.setExpiresAt(expiry);
//         emailOtpRepository.save(emailOtp);

//         return otp;
//     }
// }

package com.instagram.auth.registration.otp.otpemail;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailOtpService {

    @Autowired
    private EmailOtpRepository emailOtpRepository;

    public String saveOtp(String email, String otp) {
        // Delete existing OTPs for the email
        emailOtpRepository.deleteAll(emailOtpRepository.findByEmail(email));

        // Set current time and expiry time (e.g., 2 minutes later)
        Date now = new Date();
        Date expiry = new Date(System.currentTimeMillis() + 2 * 60 * 1000); // 2 minutes in ms

        // Create and save new OTP
        EmailOtp emailOtp = new EmailOtp();
        emailOtp.setEmail(email);
        emailOtp.setOtp(otp);
        emailOtp.setCreatedAt(now);
        emailOtp.setExpiresAt(expiry);
        emailOtpRepository.save(emailOtp);

        return otp;
    }
}