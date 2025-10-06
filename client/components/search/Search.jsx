
"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/auth/axiosInstance";
import Link from "next/link";
import PostCard from "@/components/post/PostCard"; // 👈 import your PostCard
import { useUser } from "@/context/UserContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const { state: { user } } = useUser();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/v1/users/search/all/${query}`);
      if (res.data.success) {
        setResults(res.data.data);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update function to pass to PostCard
  const handleUpdatePost = (postId, updatedFields) => {
    setResults(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === postId ? { ...p, ...updatedFields } : p)
    }));
  };

  const handleDeletePost = (postId) => {
    setResults(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== postId)
    }));
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by username, fullname or post..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {/* Users Results */}
      {results.users.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-2">Users</h2>
          <ul className="space-y-3 mb-6">
            {results.users.map((userItem) => (
              <li
                key={userItem.userId}
                className="flex items-center gap-3 p-2 bg-gray-100 rounded"
              >
                <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold">
                  {userItem.userName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <Link
                    href={`/dashboard/profile/${userItem.userName}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {userItem.userName}
                  </Link>
                  <p className="text-sm text-gray-600">{userItem.fullName || ""}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Posts Results */}
      {results.posts.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-2">Posts</h2>
          {results.posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          ))}
        </>
      )}

      {!results.users.length && !results.posts.length && !loading && (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default Search;
