
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const FollowingPage = () => {
  const { userId } = useParams();
  const router = useRouter();
  const { state: userState, updateFollowingCount } = useUser(); // 👈 added updateFollowingCount

  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch following from backend
  const fetchFollowing = useCallback(async (id) => {
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
        `${API_ROUTES.FOLLOW_SERVICE.FOLLOWINGS.replace("{userId}", id)}`
      );
      if (response.data.success) {
        setFollowing(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch followings.");
      }
    } catch (err) {
      console.error("Followings fetch error:", err);
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
      fetchFollowing(userId);
    }
  }, [userId, fetchFollowing, userState.user]);

  // 🔹 Unfollow handler
  const handleUnfollow = async (followedUserId) => {
    try {
      const res = await axiosInstance.post(API_ROUTES.FOLLOW_SERVICE.UNFOLLOW, {
        followerId: userState.user.userId,   // 👈 current user
        followingId: followedUserId,        // 👈 the one you unfollow
      });
  
      if (res.data.success) {
        setFollowing((prev) => prev.filter((f) => f.userId !== followedUserId));
        updateFollowingCount(-1);
      } else {
        alert(res.data.message || "Failed to unfollow user.");
      }
    } catch (err) {
      console.error("Unfollow error:", err);
      alert("Error unfollowing user.");
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
          <p className="mt-4 text-gray-600">Loading users you follow...</p>
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
          <h1 className="text-2xl font-semibold text-gray-800">Following</h1>
          <div className="w-6"></div>
        </div>

        {/* Following list */}
        {following.length > 0 ? (
          <ul className="space-y-4">
            {following.map((followedUser) => {
              const initial =
                followedUser.userName?.charAt(0).toUpperCase() || "?";

              return (
                <li
                  key={followedUser.userId || followedUser.id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-bold text-lg">
                      {initial}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/user/${followedUser.userId}`)
                      }
                    >
                      <h2 className="text-lg font-medium text-gray-900">
                        {followedUser.userName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {followedUser.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Following button */}
                  <button
                    onClick={() => handleUnfollow(followedUser.userId)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Following
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>Not following anyone yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;
// "use client";

// import React, { useEffect, useState } from "react";
// import axiosInstance from "@/utils/auth/axiosInstance";
// import { API_ROUTES } from "@/config";
// import { useUser } from "@/context/UserContext";

// const FollowingsPage = () => {
//   const {
//     state: { user },
//     updateFollowingCount,
//   } = useUser();

//   const [followings, setFollowings] = useState([]);

//   // Fetch followings of current user
//   useEffect(() => {
//     const fetchFollowings = async () => {
//       try {
//         const res = await axiosInstance.get(
//           API_ROUTES.FOLLOW_SERVICE.FOLLOWINGS.replace("{userId}", user.objectId)
//         );
//         if (res.data.success) {
//           setFollowings(res.data.data);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching followings:", err.response?.data || err.message);
//       }
//     };

//     if (user?.objectId) fetchFollowings();
//   }, [user]);

//   // Handle unfollow
//   const handleUnfollow = async (followingId) => {
//     try {
//       const payload = {
//         followerId: user.objectId, // logged-in user
//         followingId: followingId,  // person to unfollow
//       };

//       console.log("🚀 Sending unfollow request:", payload);

//       const res = await axiosInstance.post(API_ROUTES.FOLLOW_SERVICE.UNFOLLOW, payload);

//       if (res.data.success) {
//         // Remove from list
//         setFollowings((prev) => prev.filter((f) => f.objectId !== followingId));
//         // Update count in dashboard
//         updateFollowingCount(-1);
//       } else {
//         alert(res.data.message || "Failed to unfollow user.");
//       }
//     } catch (err) {
//       console.error("❌ Unfollow error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Error unfollowing user.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Your Followings</h2>
//       {followings.length === 0 ? (
//         <p className="text-gray-500">You are not following anyone.</p>
//       ) : (
//         <div className="space-y-4">
//           {followings.map((followedUser) => (
//             <div
//               key={followedUser.objectId}
//               className="flex items-center justify-between bg-white shadow-md p-3 rounded-xl"
//             >
//               {/* Avatar with first letter */}
//               <div className="flex items-center">
//                 <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
//                   {followedUser.userName?.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-semibold">{followedUser.userName}</p>
//                   <p className="text-xs text-gray-500">{followedUser.fullName}</p>
//                 </div>
//               </div>

//               {/* Unfollow button */}
//               <button
//                 onClick={() => handleUnfollow(followedUser.objectId)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Following
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FollowingsPage;
