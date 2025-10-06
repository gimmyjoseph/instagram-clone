
package com.instagram.post;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, ObjectId> {
    List<Post> findPostsByUserId(String userId);
    List<Post> findPostsByUserIdIn(List<String> userIds);
    List<Post> findByCaptionContainingIgnoreCase(String caption);


}