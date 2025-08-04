package com.instagram.auth.registration;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


//@EnableMongoRepositories
public interface RegisterRepository  extends MongoRepository<Register, ObjectId>{
    Optional<Register> findByPhoneNumber(String phoneNumber);
    Optional<Register> findByUserName(String userName);
    Optional<Register> findByEmail(String email);

}
