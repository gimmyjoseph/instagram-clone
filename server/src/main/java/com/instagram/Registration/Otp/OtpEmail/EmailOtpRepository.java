package com.instagram.Registration.Otp.OtpEmail;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@EnableMongoRepositories


public interface  EmailOtpRepository extends MongoRepository<EmailOtp, String>{
    List<EmailOtp> findByEmail(String email);
}
