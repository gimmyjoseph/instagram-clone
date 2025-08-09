package com.instagram.auth.registration;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


//@EnableMongoRepositories
public interface RegisterRepository  extends MongoRepository<Register, ObjectId>{
         Optional<Register> findByPhoneNumber(String phoneNumber);
         List<Register> findAllByPhoneNumber(String phoneNumber);
         void deleteByPhoneNumber(String phoneNumber);
         void deleteByEmail(String email);
         Optional<Register> findByEmail(String email);
         Optional<Register> findByUserName(String userName);
        Optional<Register> findByUserId(String userId);
         
 }
         


