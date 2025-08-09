package com.instagram.posts;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.response.Response;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class PostService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PostRepository postRepository;

    public Response addPosts(UserIds newPosts) {
        if (newPosts.getUserId() == null) {
            return new Response(400, "User from frontend not available", false);
        }

        Optional<UserIds> existingUserOptional = postRepository.findById(newPosts.getUserId());

        if (existingUserOptional.isEmpty()) {
            // New user - create new post list and save
            UserIds user = new UserIds();
            user.setUserId(newPosts.getUserId());

            List<Posts> newPostList = new ArrayList<>();
            newPostList.addAll(newPosts.getPosts()); // ✅ Corrected
            user.setPosts(newPostList);

            postRepository.save(user);
            return new Response(200, "Post added for new user", true);
        } else {
            // Existing user - append to existing posts
            UserIds existingUser = existingUserOptional.get();

            List<Posts> postList = existingUser.getPosts();
            if (postList == null) {
                postList = new ArrayList<>();
            }
            postList.addAll(newPosts.getPosts()); // ✅ Corrected
            existingUser.setPosts(postList);

            postRepository.save(existingUser);
            return new Response(200, "Post added to existing user", true);
        }
    }
}


