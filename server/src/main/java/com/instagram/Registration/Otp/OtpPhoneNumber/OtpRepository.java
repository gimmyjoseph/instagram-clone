package com.instagram.Registration.Otp.OtpPhoneNumber;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@EnableMongoRepositories
public interface OtpRepository extends MongoRepository<Otp,ObjectId> {
        List<Otp> findByPhoneNumber(String phoneNumber);
        
}   
