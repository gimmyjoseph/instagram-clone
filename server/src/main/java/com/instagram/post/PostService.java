
package com.instagram.post;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.instagram.auth.registration.Register;
import com.instagram.auth.registration.RegisterRepository;
import com.instagram.follows.Follow;
import com.instagram.follows.FollowRepository;
import com.instagram.response.Response;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private RegisterRepository registerRepository;
    @Autowired
    private FollowRepository followRepository;

    // ✅ Create a new post
    public Response createPost(String userId, MultipartFile file, String caption) {
        if (userId == null || userId.isEmpty() || file == null || file.isEmpty()) {
            return new Response(400, "User ID and image required", false);
        }

        Optional<Register> userOpt = registerRepository.findById(new ObjectId(userId));
        if (userOpt.isEmpty()) {
            return new Response(404, "User not found", false);
        }

        try {
            File uploadDir = new File("uploads");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get("uploads", fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + fileName;

            Register user = userOpt.get();
            String username = user.getUserName();

            Post post = new Post(userId, username, imageUrl, caption != null ? caption.trim() : "");
            postRepository.save(post);

            user.setPostCount(user.getPostCount() + 1);
            registerRepository.save(user);

            return new Response(201, "Post created", true, post);

        } catch (IOException e) {
            return new Response(500, "Error saving file", false);
        }
    }

    // ✅ Get all posts of a specific user
    public Response getUserPosts(String userId) {
        if (userId == null || userId.isEmpty()) {
            return new Response(400, "User ID required", false);
        }

        List<Post> posts = postRepository.findPostsByUserId(userId);
        posts.sort((a, b) -> b.getId().compareTo(a.getId()));

        List<Post> enrichedPosts = posts.stream().map(post -> {
            if (post.getUsername() == null || post.getUsername().isEmpty()) {
                registerRepository.findById(new ObjectId(post.getUserId()))
                        .ifPresent(user -> post.setUsername(user.getUserName()));
            }
            return post;
        }).collect(Collectors.toList());

        return new Response(200, "Posts retrieved", true, enrichedPosts);
    }

    // ✅ Get posts of people the user follows
    public Response getFollowingPosts(String userId) {
        if (userId == null || userId.isEmpty()) {
            return new Response(400, "User ID required", false);
        }

        Optional<Register> userOpt = registerRepository.findById(new ObjectId(userId));
        if (userOpt.isEmpty()) {
            return new Response(404, "User not found", false);
        }

        List<Follow> follows = followRepository.findByFollowerId(userId);
        List<String> followingIds = new ArrayList<>();
        for (Follow f : follows) {
            followingIds.add(f.getFollowingId());
        }

        followingIds.add(userId);

        List<Post> posts = followingIds.isEmpty()
                ? List.of()
                : postRepository.findPostsByUserIdIn(followingIds);

        posts.sort((a, b) -> b.getId().compareTo(a.getId()));

        List<Post> enrichedPosts = posts.stream().map(post -> {
            if (post.getUsername() == null || post.getUsername().isEmpty()) {
                registerRepository.findById(new ObjectId(post.getUserId()))
                        .ifPresent(user -> post.setUsername(user.getUserName()));
            }
            return post;
        }).collect(Collectors.toList());

        return new Response(200, "Following posts retrieved", true, enrichedPosts);
    }

    // ✅ Delete a post
    public Response deletePost(String postId, String userId) {
        if (postId == null || userId == null || postId.isEmpty() || userId.isEmpty()) {
            return new Response(400, "Post ID and User ID required", false);
        }

        Optional<Post> post = postRepository.findById(new ObjectId(postId));
        if (post.isEmpty()) {
            return new Response(404, "Post not found", false);
        }

        if (!post.get().getUserId().equals(userId)) {
            return new Response(403, "Unauthorized", false);
        }

        postRepository.deleteById(new ObjectId(postId));

        registerRepository.findById(new ObjectId(userId)).ifPresent(user -> {
            user.setPostCount(user.getPostCount() - 1);
            registerRepository.save(user);
        });

        return new Response(200, "Post deleted", true);
    }

    // ✅ Like or Unlike
    public Response likePost(String postId, String userId) {
        if (postId == null || userId == null || postId.isEmpty() || userId.isEmpty()) {
            return new Response(400, "Post ID and User ID required", false);
        }

        Optional<Post> postOpt = postRepository.findById(new ObjectId(postId));
        if (postOpt.isEmpty()) {
            return new Response(404, "Post not found", false);
        }

        Optional<Register> userOpt = registerRepository.findById(new ObjectId(userId));
        if (userOpt.isEmpty()) {
            return new Response(404, "User not found", false);
        }

        Post post = postOpt.get();
        Register user = userOpt.get();

        String username = user.getUserName();
        String fullName = user.getFullName();

        if (post.getLikes().stream().anyMatch(like -> like.getUserId().equals(userId))) {
            post.removeLike(userId);
            postRepository.save(post);
            return new Response(200, "Post unliked", true, post.getLikeCount());
        } else {
            post.addLike(userId, username, fullName);
            postRepository.save(post);
            return new Response(200, "Post liked", true, post.getLikeCount());
        }
    }

    // ✅ Get Likes
    public Response getPostLikes(String postId) {
        if (postId == null || postId.isEmpty()) {
            return new Response(400, "Post ID required", false);
        }

        Optional<Post> postOpt = postRepository.findById(new ObjectId(postId));
        if (postOpt.isEmpty()) {
            return new Response(404, "Post not found", false);
        }

        Post post = postOpt.get();

        post.getLikes().forEach(like -> {
            if (like.getFullName() == null || like.getFullName().isEmpty()) {
                registerRepository.findById(new ObjectId(like.getUserId()))
                        .ifPresent(user -> like.setFullName(user.getFullName()));
            }
        });

        return new Response(200, "Likes retrieved", true, post.getLikes());
    }

    // ✅ Update Caption
    public Response updateCaption(String postId, String userId, String newCaption) {
        if (postId == null || userId == null || newCaption == null || postId.isEmpty() || userId.isEmpty()) {
            return new Response(400, "Post ID, User ID and Caption required", false);
        }

        Optional<Post> postOpt = postRepository.findById(new ObjectId(postId));
        if (postOpt.isEmpty()) {
            return new Response(404, "Post not found", false);
        }

        Post post = postOpt.get();
        if (!post.getUserId().equals(userId)) {
            return new Response(403, "Unauthorized", false);
        }

        post.setCaption(newCaption);
        postRepository.save(post);

        return new Response(200, "Caption updated", true, post);
    }

    // ✅ Add Comment
    public Response addComment(String postId, String userId, String text) {
        if (postId == null || userId == null || text == null || postId.isEmpty() || userId.isEmpty()) {
            return new Response(400, "Post ID, User ID and Comment text required", false);
        }

        Optional<Post> postOpt = postRepository.findById(new ObjectId(postId));
        if (postOpt.isEmpty()) {
            return new Response(404, "Post not found", false);
        }

        Optional<Register> userOpt = registerRepository.findById(new ObjectId(userId));
        if (userOpt.isEmpty()) {
            return new Response(404, "User not found", false);
        }

        Post post = postOpt.get();
        Register user = userOpt.get();

        post.addComment(userId, user.getUserName(), user.getFullName(), text);
        postRepository.save(post);

        return new Response(200, "Comment added", true, post.getComments());
    }

    // ✅ Get Comments
    public Response getComments(String postId) {
        if (postId == null || postId.isEmpty()) {
            return new Response(400, "Post ID required", false);
        }

        Optional<Post> postOpt = postRepository.findById(new ObjectId(postId));
        if (postOpt.isEmpty()) {
            return new Response(404, "Post not found", false);
        }

        return new Response(200, "Comments retrieved", true, postOpt.get().getComments());
    }


    public Response deleteComment(String postId, String commentId, String userId) {
        if (postId == null || commentId == null || userId == null ||
            postId.isEmpty() || commentId.isEmpty() || userId.isEmpty()) {
            return new Response(400, "Post ID, Comment ID, and User ID required", false);
        }
    
        Optional<Post> postOpt = postRepository.findById(new ObjectId(postId));
        if (postOpt.isEmpty()) {
            return new Response(404, "Post not found", false);
        }
    
        Post post = postOpt.get();
        boolean removed = post.removeComment(commentId, userId, post.getUserId()); // Pass post owner ID
    
        if (!removed) {
            return new Response(403, "Unauthorized or comment not found", false);
        }
    
        postRepository.save(post);
        return new Response(200, "Comment deleted", true, post.getComments());
    }
    
}
