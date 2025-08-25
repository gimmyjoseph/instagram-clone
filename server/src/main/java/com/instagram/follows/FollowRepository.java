package com.instagram.follows;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowRepository extends MongoRepository<Follow, String>{
    boolean existsByFollowerIdAndFollowingId(String followerId, String followingId);
    List<Follow> findByFollowerId(String followerId);
    List<Follow> findByFollowingId(String followingId);
    void deleteByFollowerIdAndFollowingId(String followerId, String followingId);
}
