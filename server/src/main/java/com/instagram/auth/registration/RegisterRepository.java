package com.instagram.auth.registration;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


//@EnableMongoRepositories
public interface RegisterRepository  extends MongoRepository<Register, ObjectId>{
    Optional<Register> findByPhoneNumber(String phoneNumber);
<<<<<<< HEAD:server/src/main/java/com/instagram/auth/registration/RegisterRepository.java
    Optional<Register> findByUserName(String userName);
    Optional<Register> findByEmail(String email);
=======
    List<Register> findAllByPhoneNumber(String phoneNumber);
    void deleteByPhoneNumber(String phoneNumber);
     void deleteByEmail(String email);
         Optional<Register> findByEmail(String phoneNumber);



>>>>>>> b4c607ae562b3df11931d35453c07eca8c71f683:server/src/main/java/com/instagram/Registration/RegisterRepository.java

}
