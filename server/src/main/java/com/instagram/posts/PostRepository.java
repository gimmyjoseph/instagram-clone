package com.instagram.posts;


import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


public interface PostRepository extends MongoRepository<UserIds,String> {
    Optional<UserIds> findByUserId(String userId);
}
