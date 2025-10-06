// package com.instagram.posts;


// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// import org.bson.types.ObjectId;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.instagram.response.Response;
// import com.instagram.auth.registration.RegisterRepository;

// @Service
// public class PostService {

//     @Autowired
//     private RegisterRepository registerRepository;

//     @Autowired
//     private PostRepository postRepository;

//     public Response addPosts(UserIds newPosts) {
//     if (newPosts.getUserId() == null) {
//         return new Response(400, "User from frontend not available", false);
//     }

//     // Ensure every incoming post has an ID
//     for (Posts post : newPosts.getPosts()) {
//         if (post.getPostId() == null) {
//             post.setPostId(new ObjectId());
//         }
//     }

//     Optional<UserIds> existingUserOptional = postRepository.findById(newPosts.getUserId());

//     if (existingUserOptional.isEmpty()) {
//         // New user - create new post list and save
//         UserIds user = new UserIds();
//         user.setUserId(newPosts.getUserId());

//         List<Posts> newPostList = new ArrayList<>(newPosts.getPosts());
//         user.setPosts(newPostList);

//         postRepository.save(user);
//         return new Response(200, "Post added for new user", true);
//     } else {
//         // Existing user - append to existing posts
//         UserIds existingUser = existingUserOptional.get();

//         List<Posts> postList = existingUser.getPosts();
//         if (postList == null) {
//             postList = new ArrayList<>();
//         }
//         postList.addAll(newPosts.getPosts());
//         existingUser.setPosts(postList);

//         postRepository.save(existingUser);
//         return new Response(200, "Post added to existing user", true);
//     }
// }


//             public Response getPosts(String userId) {
//             if (userId == null) {
//                 return new Response(400, "User from frontend not available", false);
//             }

//             Optional<UserIds> existingOptional = postRepository.findById(userId);
//             if (existingOptional.isEmpty()) {
//                 return new Response(400, "Check the userId", false);
//             }

//             return new Response(200, "All posts found", true, existingOptional.get());
//         }

               

// public Response addLikes(String userId, String postId) {
//     if (userId == null || postId == null) {
//         return new Response(400, "UserId or PostId from frontend not available", false);
//     }

//     Optional<UserIds> existingOptional = postRepository.findById(userId);
//     if (existingOptional.isEmpty()) {
//         return new Response(400, "userId not found", false);
//     }

//     UserIds existingDetails = existingOptional.get();
//     boolean postFound = false;

//     ObjectId postObjectId;
//     try {
//         postObjectId = new ObjectId(postId); // convert to ObjectId
//     } catch (IllegalArgumentException e) {
//         return new Response(400, "Invalid postId format", false);
//     }

//     for (Posts post : existingDetails.getPosts()) {
//         if (post.getPostId().equals(postObjectId)) {
//             postFound = true;
//             if (post.getLikes() == null) {
//                 post.setLikes(new java.util.ArrayList<>());
//             }
//             if (!post.getLikes().contains(userId)) {
//                 post.getLikes().add(userId);
//             }
//             break;
//         }
//     }

//     if (!postFound) {
//         return new Response(404, "Post not found for this user", false);
//     }

//     postRepository.save(existingDetails);
//     return new Response(200, "Like added successfully", true);
// }


    
// }