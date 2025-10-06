
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
    private FollowRepository followRepository;

    // ✅ Follow user
    public Response followUser(Follow follow) {
        if (follow.getFollowerId() == null || follow.getFollowerId().isEmpty() ||
            follow.getFollowingId() == null || follow.getFollowingId().isEmpty()) {
            return new Response(400, "Follower ID and Following ID are required", false, null);
        }

        if (follow.getFollowerId().equals(follow.getFollowingId())) {
            return new Response(400, "Cannot follow yourself", false, null);
        }

        if (!registerRepository.existsById(new ObjectId(follow.getFollowerId())) ||
            !registerRepository.existsById(new ObjectId(follow.getFollowingId()))) {
            return new Response(404, "User not found", false, null);
        }

        if (followRepository.existsByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId())) {
            return new Response(400, "Already following", false, null);
        }

        Follow newFollow = new Follow();
        newFollow.setFollowerId(follow.getFollowerId());
        newFollow.setFollowingId(follow.getFollowingId());
        followRepository.save(newFollow);

        // Update counts
        Register followerUser = registerRepository.findById(new ObjectId(follow.getFollowerId())).get();
        Register followingUser = registerRepository.findById(new ObjectId(follow.getFollowingId())).get();
        followerUser.setFollowingCount(followerUser.getFollowingCount() + 1);
        followingUser.setFollowerCount(followingUser.getFollowerCount() + 1);
        registerRepository.save(followerUser);
        registerRepository.save(followingUser);

        Map<String, Long> counts = new HashMap<>();
        counts.put("followerCount", followingUser.getFollowerCount());
        counts.put("followingCount", followerUser.getFollowingCount());

        return new Response(201, "Followed successfully", true, counts);
    }

    // ✅ Check follow status
    public Response checkFollowStatus(String followerId, String followingId) {
        if (followerId == null || followerId.isEmpty() ||
            followingId == null || followingId.isEmpty()) {
            return new Response(400, "Follower ID and Following ID are required", false, null);
        }

        if (!registerRepository.existsById(new ObjectId(followerId)) ||
            !registerRepository.existsById(new ObjectId(followingId))) {
            return new Response(404, "User not found", false, null);
        }

        boolean isFollowing = followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);

        return new Response(200,
                isFollowing ? "User is following the target" : "User is not following the target",
                true,
                isFollowing);
    }

    // ✅ Get followers
    public Response getFollowers(String userId) {
        if (userId == null || userId.isEmpty()) {
            return new Response(400, "User ID is required", false, null);
        }

        if (!registerRepository.existsById(new ObjectId(userId))) {
            return new Response(404, "User not found", false, null);
        }

        List<Follow> followers = followRepository.findByFollowingId(userId);
        List<Register> followerUsers = new ArrayList<>();

        for (Follow follow : followers) {
            Optional<Register> followerUserOpt = registerRepository.findById(new ObjectId(follow.getFollowerId()));
            if (followerUserOpt.isPresent()) {
                Register followerUser = followerUserOpt.get();

                Register simplifiedUser = new Register();
                simplifiedUser.setUserId(followerUser.getObjectId()); // ✅ plain string
                simplifiedUser.setUserName(followerUser.getUserName());
                simplifiedUser.setFullName(followerUser.getFullName());

                followerUsers.add(simplifiedUser);
            }
        }

        return new Response(200, "Followers retrieved", true, followerUsers);
    }

    // ✅ Get followings
    public Response getFollowings(String userId) {
        if (userId == null || userId.isEmpty()) {
            return new Response(400, "User ID is required", false, null);
        }

        if (!registerRepository.existsById(new ObjectId(userId))) {
            return new Response(404, "User not found", false, null);
        }

        List<Follow> followings = followRepository.findByFollowerId(userId);
        List<Register> followedUsers = new ArrayList<>();

        for (Follow follow : followings) {
            Optional<Register> followedUserOpt = registerRepository.findById(new ObjectId(follow.getFollowingId()));
            if (followedUserOpt.isPresent()) {
                Register followedUser = followedUserOpt.get();

                Register simplifiedUser = new Register();
                simplifiedUser.setUserId(followedUser.getObjectId()); // ✅ plain string
                simplifiedUser.setUserName(followedUser.getUserName());
                simplifiedUser.setFullName(followedUser.getFullName());

                followedUsers.add(simplifiedUser);
            }
        }

        return new Response(200, "Followings retrieved", true, followedUsers);
    }

    // ✅ Unfollow user
    public Response unfollowUser(Follow follow) {
        if (follow.getFollowerId() == null || follow.getFollowerId().isEmpty() ||
            follow.getFollowingId() == null || follow.getFollowingId().isEmpty()) {
            return new Response(400, "Follower ID and Following ID are required", false, null);
        }

        if (!registerRepository.existsById(new ObjectId(follow.getFollowerId())) ||
            !registerRepository.existsById(new ObjectId(follow.getFollowingId()))) {
            return new Response(404, "User not found", false, null);
        }

        if (!followRepository.existsByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId())) {
            return new Response(400, "Not following this user", false, null);
        }

        followRepository.deleteByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId());

        Register followerUser = registerRepository.findById(new ObjectId(follow.getFollowerId())).get();
        Register followingUser = registerRepository.findById(new ObjectId(follow.getFollowingId())).get();
        followerUser.setFollowingCount(followerUser.getFollowingCount() - 1);
        followingUser.setFollowerCount(followingUser.getFollowerCount() - 1);
        registerRepository.save(followerUser);
        registerRepository.save(followingUser);

        Map<String, Long> counts = new HashMap<>();
        counts.put("followerCount", followingUser.getFollowerCount());
        counts.put("followingCount", followerUser.getFollowingCount());

        return new Response(200, "Unfollowed successfully", true, counts);
    }

    // ✅ Non-followed users (suggestions)
    public Response getNonFollowedUsers(String userId) {
        if (userId == null || userId.isEmpty()) {
            return new Response(400, "User ID is required", false, null);
        }

        ObjectId objectId = new ObjectId(userId);
        if (!registerRepository.existsById(objectId)) {
            return new Response(404, "User not found", false, null);
        }

        List<Follow> follows = followRepository.findByFollowerId(userId);
        List<String> followedIds = new ArrayList<>();
        for (Follow f : follows) {
            followedIds.add(f.getFollowingId());
        }

        List<Register> allUsers = registerRepository.findAll();
        List<Register> nonFollowedUsers = new ArrayList<>();

        for (Register user : allUsers) {
            String currentId = user.getObjectId();

            if (!currentId.equals(userId) && !followedIds.contains(currentId)) {
                Register simplifiedUser = new Register();
                simplifiedUser.setUserId(currentId); // ✅ plain string
                simplifiedUser.setUserName(user.getUserName());
                simplifiedUser.setFullName(user.getFullName());
                nonFollowedUsers.add(simplifiedUser);
            }
        }

        return new Response(200, "Non-followed users retrieved", true, nonFollowedUsers);
    }

    // ✅ Remove follower
    public Response removeFollower(String userId, String followerId) {
        if (!registerRepository.existsById(new ObjectId(userId)) ||
            !registerRepository.existsById(new ObjectId(followerId))) {
            return new Response(404, "User not found", false, null);
        }

        if (!followRepository.existsByFollowerIdAndFollowingId(followerId, userId)) {
            return new Response(400, "This user is not your follower", false, null);
        }

        followRepository.deleteByFollowerIdAndFollowingId(followerId, userId);

        Register currentUser = registerRepository.findById(new ObjectId(userId)).get();
        Register removedFollower = registerRepository.findById(new ObjectId(followerId)).get();

        currentUser.setFollowerCount(currentUser.getFollowerCount() - 1);
        removedFollower.setFollowingCount(removedFollower.getFollowingCount() - 1);

        registerRepository.save(currentUser);
        registerRepository.save(removedFollower);

        Map<String, Long> counts = new HashMap<>();
        counts.put("followerCount", currentUser.getFollowerCount());
        counts.put("followingCount", removedFollower.getFollowingCount());

        return new Response(200, "Follower removed successfully", true, counts);
    }
}
