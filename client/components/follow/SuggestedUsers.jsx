
"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";

const SuggestedUsers = () => {
  const {
    state: { user },
    updateFollowingCount,
    fetchProfile, // available if we want backend sync
  } = useUser();

  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      if (!user?.userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `${API_ROUTES.FOLLOW_SERVICE.NON_FOLLOWED_USERS}?userId=${user.userId}`
        );
        if (response.data.success) {
          setSuggestedUsers(response.data.data || []);
        } else {
          setError(response.data.message || "Failed to fetch suggested users");
        }
      } catch (err) {
        const message =
          err.response?.data?.message || "Error fetching suggested users";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, [user]);

  const handleFollow = async (targetUserId) => {
    if (!user?.userId) {
      setError("Current user ID is missing");
      return;
    }

    try {
      const response = await axiosInstance.post(
        API_ROUTES.FOLLOW_SERVICE.FOLLOW,
        {
          followerId: user.userId,
          followingId: targetUserId,
        }
      );

      if (response.data.success) {
        // ✅ remove followed user from list
        setSuggestedUsers((prev) =>
          prev.filter((u) => u.userId !== targetUserId)
        );

        // ✅ instantly update UI
        updateFollowingCount(1);

        // ✅ optional backend sync (avoids overwriting immediately)
        // setTimeout(fetchProfile, 2000);

      } else {
        setError(response.data.message || "Error following user");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Error following user";
      setError(message);
    }
  };

  if (loading) {
    return (
      <div className="p-3 bg-white rounded-lg shadow">
        <p className="text-gray-600 text-sm">Loading suggestions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-white rounded-lg shadow">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white rounded-lg shadow sticky top-4">
      <h2 className="text-base font-semibold mb-2">Suggested Users</h2>
      {suggestedUsers.length === 0 ? (
        <p className="text-gray-500 text-sm">No suggestions right now.</p>
      ) : (
        <div className="space-y-2">
          {suggestedUsers.map((suggestedUser) => {
            const initial = suggestedUser.userName?.[0]?.toUpperCase() || "U";

            return (
              <div
                key={suggestedUser.userId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {initial}
                    </span>
                  </div>

                  {/* Username + Fullname */}
                  <div className="leading-tight">
                    <p className="font-medium text-gray-900 text-sm">
                      {suggestedUser.userName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {suggestedUser.fullName || suggestedUser.userName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleFollow(suggestedUser.userId)}
                  className="px-2 py-0.5 rounded-md text-xs font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  Follow
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuggestedUsers;
