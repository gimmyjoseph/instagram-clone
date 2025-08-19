package com.instagram.follow;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.response.Response;

  @Service
public class FollowingService {

    @Autowired
    private FollowingRepository followRepository;

    public Response addWhatIFollowToPendingList(String myUserId, String followUserId, String userName) {

        Optional<MyUserId> optionalExisting = followRepository.findById(myUserId);

        if (optionalExisting.isEmpty()) {
            // First time: new follow list
            MyUserId newOne = new MyUserId();
            newOne.setUserIds(myUserId);

            List<PendingUserIds> pendingList = new ArrayList<>();
            pendingList.add(new PendingUserIds(followUserId, userName, "add me"));

            newOne.setPendingUserIds(pendingList);
            newOne.setFollowUserIds(new ArrayList<>()); // initialize empty follow list

            followRepository.save(newOne);

            return new Response(200, "Following list created and user added to pending", true,newOne);

        } else {
            // Existing follow list
            MyUserId existingUser = optionalExisting.get();

            if (existingUser.getPendingUserIds() == null) {
                existingUser.setPendingUserIds(new ArrayList<>());
            }

            // Check manually if user already pending
            for (PendingUserIds p : existingUser.getPendingUserIds()) {
                if (p.getUserIdPendingForAccepting().equals(followUserId)) {
                    return new Response(409, "Already given for accepting", false);
                }
            }

            // Not found → add new pending request
            existingUser.getPendingUserIds().add(new PendingUserIds(followUserId, userName, "add me"));
            followRepository.save(existingUser);

            return new Response(200, "User added to pending list", true,existingUser);
        }
    }

    
            public Response getMePendingDetails(String myUserId) {
            Optional<MyUserId> optionalExisting = followRepository.findById(myUserId);

            if (optionalExisting.isEmpty()) {
                return new Response(401, "userid is wrong", false);
            }

            // Access the document
            MyUserId userDoc = optionalExisting.get();
            List<PendingUserIds> list = userDoc.getPendingUserIds();

            return new Response(200, "all pending requests are sent from backend", true, list);
        }

}