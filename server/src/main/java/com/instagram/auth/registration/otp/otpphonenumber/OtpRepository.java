// package com.instagram.auth.registration.otp.otpphonenumber;

// import java.util.List;

// import org.bson.types.ObjectId;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


// @EnableMongoRepositories
// public interface OtpRepository extends MongoRepository<Otp,ObjectId> {
//         List<Otp> findByPhoneNumber(String phoneNumber);
        
// }   

package com.instagram.auth.registration.otp.otpphonenumber;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@EnableMongoRepositories
public interface OtpRepository extends MongoRepository<Otp,ObjectId> {
        List<Otp> findByPhoneNumber(String phoneNumber);
        
}   