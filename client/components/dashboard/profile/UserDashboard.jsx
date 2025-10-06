
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import PostCard from "@/components/post/PostCard";

const UserDashboard = () => {
  const {
    state: { user: loggedInUser },
  } = useUser();

  const router = useRouter();
  const params = useParams(); // ✅ dynamic route params
  const usernameFromUrl = params?.username;

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (usernameFromUrl) {
          // Visiting someone else’s profile
          const userRes = await axiosInstance.get(
            `/api/v1/users/username/${usernameFromUrl}`
          );

          if (!userRes.data.success || !userRes.data.data) {
            throw new Error("User not found");
          }

          const userData = userRes.data.data;
          setProfileUser(userData);

          // fetch their posts
          const postRes = await axiosInstance.get(
            `/api/v1/posts/user/${userData.userId}`
          );
          setPosts(postRes.data.data || []);
        } else if (loggedInUser) {
          // Own profile
          setProfileUser(loggedInUser);

          const postRes = await axiosInstance.get(
            `/api/v1/posts/user/${loggedInUser.userId}`
          );
          setPosts(postRes.data.data || []);
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        alert("User not found");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usernameFromUrl, loggedInUser?.userId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!profileUser) return <p className="p-4">User not found</p>;

  const userInitial =
    profileUser?.userName?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {userInitial}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {profileUser.userName}
            </h1>

            {/* ✅ Show Message button ONLY for other users */}
            {usernameFromUrl &&
              profileUser.userId !== loggedInUser?.userId && (
                <button
                  onClick={() =>
                    router.push(`/features/message?to=${profileUser.userId}`)
                  }
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Message
                </button>
              )}
          </div>

          {/* Stats section */}
          <div className="flex gap-6 mt-2 text-gray-700">
            <span>{posts.length} posts</span>

            <span
              onClick={() =>
                router.push(`/dashboard/followers/${profileUser.userId}`)
              }
              className="cursor-pointer hover:underline"
            >
              {profileUser.followerCount || 0} followers
            </span>

            <span
              onClick={() =>
                router.push(`/dashboard/followings/${profileUser.userId}`)
              }
              className="cursor-pointer hover:underline"
            >
              {profileUser.followingCount || 0} following
            </span>
          </div>

          <p className="mt-2 text-gray-600">{profileUser.fullName}</p>
        </div>
      </div>

      {/* Posts Section */}
      <h3 className="text-lg font-bold mb-3">
        {usernameFromUrl
          ? `${profileUser.userName}'s Posts`
          : "Your Posts"}
      </h3>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              // ✅ Editing/deleting only for own posts
              onUpdate={
                !usernameFromUrl
                  ? (postId, update) =>
                      setPosts((prev) =>
                        prev.map((p) =>
                          p.id === postId ? { ...p, ...update } : p
                        )
                      )
                  : undefined
              }
              onDelete={
                !usernameFromUrl
                  ? (postId) =>
                      setPosts((prev) =>
                        prev.filter((p) => p.id !== postId)
                      )
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
