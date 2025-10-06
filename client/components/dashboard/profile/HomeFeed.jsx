

"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import PostCard from "@/components/post/PostCard";

const HomeFeed = () => {
  const {
    state: { user },
  } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/posts/following/${user.userId}`
        );
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchFollowingPosts();
    }
  }, [user?.userId]);

  const handlePostUpdate = (postId, update) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...update } : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Home Feed</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts from people you follow.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onUpdate={handlePostUpdate}
            onDelete={handleDeletePost}
          />
        ))
      )}
    </div>
  );
};

export default HomeFeed;
