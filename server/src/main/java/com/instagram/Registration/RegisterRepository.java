package com.instagram.Registration;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface RegisterRepository  extends MongoRepository<Register, ObjectId>{
    Optional<Register> findByPhoneNumber(String phoneNumber);
    List<Register> findAllByPhoneNumber(String phoneNumber);
    void deleteByPhoneNumber(String phoneNumber);
     void deleteByEmail(String email);
         Optional<Register> findByEmail(String phoneNumber);




}
