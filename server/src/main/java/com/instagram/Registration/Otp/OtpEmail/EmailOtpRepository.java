package com.instagram.Registration.Otp.OtpEmail;
import org.bson.types.ObjectId;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@EnableMongoRepositories


public interface  EmailOtpRepository extends MongoRepository<EmailOtp, ObjectId>{
    List<EmailOtp> findByEmail(String email);
}
