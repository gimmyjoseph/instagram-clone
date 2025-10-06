
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const FollowersPage = () => {
  const { userId } = useParams();
  const router = useRouter();
  // Destructure the new updateFollowerCount function
  const { state: userState, updateFollowerCount } = useUser(); 
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch followers from backend
  const fetchFollowers = useCallback(async (id) => {
    if (!id) {
      console.error("User ID from URL is missing.");
      setError("User profile not found. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.FOLLOW_SERVICE.FOLLOWERS.replace("{userId}", id)}`
      );
      if (response.data.success) {
        setFollowers(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch followers.");
      }
    } catch (err) {
      console.error("Followers fetch error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Network error. Please check your connection.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userState.user?.userId || userId) {
      fetchFollowers(userId);
    }
  }, [userId, fetchFollowers, userState.user]);

  // 🔹 Remove follower
  const handleRemoveFollower = async (followerId) => {
    try {
      const res = await axiosInstance.post(
        `${API_ROUTES.FOLLOW_SERVICE.REMOVE}?userId=${userState.user.userId}&followerId=${followerId}`
      );
      if (res.data.success) {
        // Update local state
        setFollowers((prev) => prev.filter((f) => f.userId !== followerId));
        
        // ✅ Correctly update the global state using the provided function
        // Pass -1 to decrement the count
        updateFollowerCount(-1);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Remove follower error:", err);
      alert("Error removing follower.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl text-blue-500 animate-spin"
          />
          <p className="mt-4 text-gray-600">Loading followers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-red-500 text-lg text-center mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Followers</h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>

        {/* Followers list */}
        {followers.length > 0 ? (
          <ul className="space-y-4">
            {followers.map((follower) => {
              const initial =
                follower.userName?.charAt(0).toUpperCase() || "?";

              return (
                <li
                  key={follower.userId || follower.id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-lg">
                      {initial}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/user/${follower.userId}`)
                      }
                    >
                      <h2 className="text-lg font-medium text-gray-900">
                        {follower.userName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {follower.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Remove button */}
                  {userState.user?.userId === userId && (
                    <button
                      onClick={() => handleRemoveFollower(follower.userId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>No followers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;