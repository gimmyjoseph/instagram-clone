

package com.instagram.follows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.response.Response;

@RestController
@RequestMapping("/api/follows")
public class FollowController {
  
      @Autowired
      private  FollowService followService;
  
      @PostMapping
      public ResponseEntity<Response> followUser(@RequestBody Follow follow) {
          Response response = followService.followUser(follow);
          return ResponseEntity.status(response.getStatuscode()).body(response);
      }

      @GetMapping("/status")
    public ResponseEntity<Response> checkFollowStatus(
            @RequestParam("followerId") String followerId,
            @RequestParam("followingId") String followingId) {
        Response response = followService.checkFollowStatus(followerId, followingId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @GetMapping("/users/{userId}/followers")
    public ResponseEntity<Response> getFollowers(@PathVariable String userId) {
        Response response = followService.getFollowers(userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @GetMapping("/users/{userId}/followings")
    public ResponseEntity<Response> getFollowings(@PathVariable String userId) {
        Response response = followService.getFollowings(userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @PostMapping("/unfollow")
    public ResponseEntity<Response> unfollowUser(@RequestBody Follow follow) {
        Response response = followService.unfollowUser(follow);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }
    @GetMapping("/users/non-followed")
    public ResponseEntity<Response> getNonFollowedUsers(@RequestParam("userId") String userId) {
        Response response = followService.getNonFollowedUsers(userId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @PostMapping("/remove")
public ResponseEntity<Response> removeFollower(
        @RequestParam("userId") String userId,
        @RequestParam("followerId") String followerId) {
    Response response = followService.removeFollower(userId, followerId);
    return ResponseEntity.status(response.getStatuscode()).body(response);
}

  }

