package com.instagram.follows;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.response.Response;

@Service
public class FollowService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private  FollowRepository followRepository;

    public Response followUser(Follow follow) {
        // 1. Check if followerId and followedId are provided
        boolean hasFollowerId = follow.getFollowerId() != null && !follow.getFollowerId().isEmpty();
        boolean hasFollowedId = follow.getFollowingId() != null && !follow.getFollowingId().isEmpty();

        if (!hasFollowerId || !hasFollowedId) {
            return new Response(400, "Follower ID and followed ID are required", false, null);
        }

        // 2. Check if self-follow
        if (follow.getFollowerId().equals(follow.getFollowingId())) {
            return new Response(400, "Cannot follow yourself", false, null);
        }

        // 3. Check if users exist
        if (!registerRepository.existsById(new ObjectId(follow.getFollowerId())) || !registerRepository.existsById(new ObjectId(follow.getFollowingId()))) {
            return new Response(404, "User not found", false, null);
        }

        // 4. Check if already following
        if (followRepository.existsByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId())) {
            return new Response(400, "Already following", false, null);
        }

        // 5. Ensure extra fields are ignored 
        Follow newFollow = new Follow();
        newFollow.setFollowerId(follow.getFollowerId());
        newFollow.setFollowingId(follow.getFollowingId());

      // 6. Save Follow document
       followRepository.save(newFollow);
      
       // 7. Update counts
       Register followerUser = registerRepository.findById(new ObjectId(follow.getFollowerId())).get();
       Register followingUser = registerRepository.findById(new ObjectId(follow.getFollowingId())).get();
       followerUser.setFollowingCount(followerUser.getFollowingCount() + 1);
       followingUser.setFollowerCount(followingUser.getFollowerCount() + 1);
       registerRepository.save(followerUser);
       registerRepository.save(followingUser);

       // 8. Return updated counts
        Map<String, Long> counts = new HashMap<>();
        counts.put("followerCount", followingUser.getFollowerCount());
        counts.put("followingCount", followerUser.getFollowingCount());
        return new Response(201, "Followed successfully", true, counts);

       //return new Response(201, "Followed successfully", true, null);
       


    }
    public Response checkFollowStatus(String followerId, String followingId) {
        // 1. Check if followerId and followingId are provided
        boolean hasFollowerId = followerId != null && !followerId.isEmpty();
        boolean hasFollowingId = followingId != null && !followingId.isEmpty();
    
        if (!hasFollowerId || !hasFollowingId) {
            return new Response(400, "Follower ID and Following ID are required", false, null);
        }
    
        // 2. Check if users exist
        if (!registerRepository.existsById(new ObjectId(followerId)) || 
            !registerRepository.existsById(new ObjectId(followingId))) {
            return new Response(404, "User not found", false, null);
        }
    
        // 3. Check follow status
        boolean isFollowing = followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);
    
        String message = isFollowing 
            ? "User is following the target" 
            : "User is not following the target";
    
        return new Response(200, message, true, isFollowing);
    }
    

    // public Response getFollowers(String userId) {
    //     boolean hasUserId = userId != null && !userId.isEmpty();
    //     if (!hasUserId) {
    //         return new Response(400, "User ID is required", false, null);
    //     }

    //     if (!registerRepository.existsById(userId)) {
    //         return new Response(404, "User not found", false, null);
    //     }

    //     List<Follow> followers = followRepository.findByFollowingId(userId);
    //     List<String> followerIds = followers.stream()
    //             .map(Follow::getFollowerId)
    //             .collect(Collectors.toList());

    //     List<Register> followerUsers = registerRepository.findAllById(followerIds).stream()
    //             .map(user -> {
    //                 Register simplifiedUser = new Register();
    //                 simplifiedUser.setId(user.getId());
    //                 simplifiedUser.setUsername(user.getUsername());
    //                 return simplifiedUser;
    //             })
    //             .collect(Collectors.toList());

    //     return new Response(200, "Followers retrieved", true, followerUsers);
    // }




public Response getFollowers(String userId) {
    // 1. Validate userId
    if (userId == null || userId.isEmpty()) {
        return new Response(400, "User ID is required", false, null);
    }

    // 2. Check if user exists
    if (!registerRepository.existsById(new ObjectId(userId))) {
        return new Response(404, "User not found", false, null);
    }

    // 3. Find all Follow objects where this user is followed
    List<Follow> followers = followRepository.findByFollowingId(userId);

    // 4. Initialize list for follower details
    List<Register> followerUsers = new ArrayList<>();

    // 5. Process each Follow object
    for (Follow follow : followers) {
        String followerId = follow.getFollowerId();

        // 5a. Fetch follower user details
        Optional<Register> followerUserOpt = registerRepository.findById(new ObjectId(followerId));

        if (followerUserOpt.isPresent()) {
            Register followerUser = followerUserOpt.get();

            // 5b. Create simplified Register object with required fields
            Register simplifiedUser = new Register();
            simplifiedUser.setObjectId(new ObjectId(followerUser.getObjectId().toHexString()));
            simplifiedUser.setUserId(followerUser.getObjectId().toHexString()); // Explicitly set userId
            simplifiedUser.setUserName(followerUser.getUserName());
            followerUsers.add(simplifiedUser);
        }
    }

    // 6. Return response with follower details
    return new Response(200, "Followers retrieved", true, followerUsers);
}
public Response getFollowings(String userId) {
    // 1. Check if userId is null or empty
    if (userId == null || userId.isEmpty()) {
        return new Response(400, "User ID is required", false, null);
    }

    // 2. Check if the user exists
    if (!registerRepository.existsById(new ObjectId(userId))) {
        return new Response(404, "User not found", false, null);
    }

    // 3. Get all "Follow" objects where this user is the follower
    List<Follow> followings = followRepository.findByFollowerId(userId);

    // 4. Prepare an empty list for followed users
    List<Register> followedUsers = new ArrayList<>();

    // 5. Loop through each "Follow" record
    for (Follow follow : followings) {
        String followedId = follow.getFollowingId();

        // 5a. Get the followed user from DB
        Optional<Register> followedUserOpt = registerRepository.findById(new ObjectId(followedId));

        if (followedUserOpt.isPresent()) {
            Register followedUser = followedUserOpt.get();

            // 5b. Create a simplified Register object
            Register simplifiedUser = new Register();
            simplifiedUser.setObjectId(new ObjectId(followedUser.getObjectId().toHexString()));
            simplifiedUser.setUserId(followedUser.getObjectId().toHexString()); // Explicitly set userId
            simplifiedUser.setUserName(followedUser.getUserName());
            followedUsers.add(simplifiedUser);
        }
    }

    // 6. Return response with the followings
    return new Response(200, "Followings retrieved", true, followedUsers);
}
public Response unfollowUser(Follow follow) {
    // 1. Check if followerId and followingId are provided
    boolean hasFollowerId = follow.getFollowerId() != null && !follow.getFollowerId().isEmpty();
    boolean hasFollowingId = follow.getFollowingId() != null && !follow.getFollowingId().isEmpty();

    if (!hasFollowerId || !hasFollowingId) {
        return new Response(400, "Follower ID and following ID are required", false, null);
    }

    // 2. Check if users exist
    if (!registerRepository.existsById(new ObjectId(follow.getFollowerId())) || 
        !registerRepository.existsById(new ObjectId(follow.getFollowingId()))) {
        return new Response(404, "User not found", false, null);
    }

    // 3. Check if following exists
    if (!followRepository.existsByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId())) {
        return new Response(400, "Not following this user", false, null);
    }

    // 4. Delete Follow document
    followRepository.deleteByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId());

    // 5. Update counts
    Register followerUser = registerRepository.findById(new ObjectId(follow.getFollowerId())).get();
    Register followingUser = registerRepository.findById(new ObjectId(follow.getFollowingId())).get();
    followerUser.setFollowingCount(followerUser.getFollowingCount() - 1);
    followingUser.setFollowerCount(followingUser.getFollowerCount() - 1);
    registerRepository.save(followerUser);
    registerRepository.save(followingUser);

    // 6. Return updated counts
    Map<String, Long> counts = new HashMap<>();
    counts.put("followerCount", followingUser.getFollowerCount());
    counts.put("followingCount", followerUser.getFollowingCount());
    return new Response(200, "Unfollowed successfully", true, counts);
}

public Response getNonFollowedUsers(String userId) {
    // 1. Check if userId is missing
    if (userId == null || userId.isEmpty()) {
        return new Response(400, "User ID is required", false, null);
    }

    // 2. Check if user exists in DB
    ObjectId objectId = new ObjectId(userId);
    if (!registerRepository.existsById(objectId)) {
        return new Response(404, "User not found", false, null);
    }

    // 3. Get all users that current user already follows
    List<Follow> follows = followRepository.findByFollowerId(userId);
    List<String> followedIds = new ArrayList<>();
    for (Follow f : follows) {
        followedIds.add(f.getFollowingId()); // store all following IDs
    }

    // 4. Get all users in DB
    List<Register> allUsers = registerRepository.findAll();
    List<Register> nonFollowedUsers = new ArrayList<>();

    // 5. Loop through all users and filter
    for (Register user : allUsers) {
        String currentId = user.getObjectId().toHexString();

        // skip self + skip already followed users
        if (!currentId.equals(userId) && !followedIds.contains(currentId)) {
            Register simplifiedUser = new Register();
            simplifiedUser.setObjectId(new ObjectId(currentId));
            simplifiedUser.setUserId(currentId); // Explicitly set userId
            simplifiedUser.setUserName(user.getUserName());
            nonFollowedUsers.add(simplifiedUser);
        }
    }

    // 6. Return final list
    return new Response(200, "Non-followed users retrieved", true, nonFollowedUsers);
}
}
