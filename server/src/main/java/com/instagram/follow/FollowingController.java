package com.instagram.follow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.response.Response;

@RequestMapping("/follow")
@RestController
public class FollowingController {
    
    @Autowired
    private FollowingService followingService;

    @PostMapping("/addFollowing")
    public ResponseEntity<Response> follow(@RequestParam String myUserId,@RequestParam String followUserId,@RequestParam String userName){
        Response response=followingService.addWhatIFollowToPendingList(myUserId,followUserId,userName);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    @GetMapping("/getPendingIds")
    public ResponseEntity<Response> getPendingIds(@RequestParam String myUserId){
        Response response=followingService.getMePendingDetails(myUserId);
        return ResponseEntity.status(response.getStatuscode()).body(response);
    }

    

   
}