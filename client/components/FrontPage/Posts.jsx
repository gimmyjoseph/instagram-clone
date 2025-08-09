"use client";

import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const toggleLike = async (postId) => {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/like`, { method: "POST" });
    const updatedPost = await res.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  const addComment = async (postId, text) => {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "you", text }),
    });
    const updatedPost = await res.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-200 rounded mb-6">
          <div className="flex items-center p-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <span className="text-sm font-semibold text-gray-600">{post.username[0]}</span>
            </div>
            <span className="font-semibold">{post.username}</span>
          </div>
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Post Image</span>
          </div>
          <div className="p-4">
            <div className="flex gap-4 mb-2">
              <i
                className="fas fa-heart text-xl cursor-pointer text-red-500"
                onClick={() => toggleLike(post.id)}
              ></i>
              <i className="far fa-comment text-xl"></i>
              <i className="far fa-paper-plane text-xl"></i>
            </div>
            <div className="font-semibold mb-2">{post.likes} likes</div>
            <div className="mb-2">
              <span className="font-semibold">{post.username}</span> {post.caption}
            </div>
            <div className="border-t border-gray-200 pt-2">
              {post.comments.map((comment) => (
                <p key={comment.id}>
                  <span className="font-semibold">{comment.user}</span> {comment.text}
                </p>
              ))}
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border-none p-2 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    addComment(post.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}