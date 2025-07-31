package com.instagram.Registration;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface RegisterRepository  extends MongoRepository<Register, ObjectId>{
    Optional<Register> findByPhoneNumber(String phoneNumber);

}
