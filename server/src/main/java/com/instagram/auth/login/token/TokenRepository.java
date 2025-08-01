package com.instagram.auth.login.token;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenRepository extends MongoRepository<UserToken, ObjectId> {
    UserToken findByEmail(String email);
    UserToken findByUserId(String userId);
}