package com.instagram.follow;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface FollowingRepository extends MongoRepository<MyUserId, String> {
    
}