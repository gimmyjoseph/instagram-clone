

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SuggestedUsersPage = () => {
  const { state: { user }, fetchProfile } = useUser();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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
        const message = err.response?.data?.message || "Error fetching suggested users";
        console.error("Fetch suggested users error:", message, err);
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
      const response = await axiosInstance.post(API_ROUTES.FOLLOW_SERVICE.FOLLOW, {
        followerId: user.userId,
        followingId: targetUserId
      });
      if (response.data.success) {
        setSuggestedUsers(prev => prev.filter(u => u.userId !== targetUserId));
        fetchProfile();
      } else {
        setError(response.data.message || "Error following user");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Error following user";
      console.error("Follow error:", message, err);
      setError(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading suggested users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center">
          <button onClick={() => router.back()} className="text-gray-600">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 ml-4">Suggested Users</h1>
        </div>
        <div className="p-4">
          {suggestedUsers.length === 0 ? (
            <p className="text-center text-gray-600">No suggested users</p>
          ) : (
            suggestedUsers.map((suggestedUser) => (
              <div
                key={suggestedUser.userId}
                className="flex items-center justify-between p-3 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">
                      {suggestedUser.userName?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{suggestedUser.userName}</p>
                    <p className="text-sm text-gray-600">@{suggestedUser.userName}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(suggestedUser.userId)}
                  className="px-4 py-1 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  Follow
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestedUsersPage;

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useUser } from "@/context/UserContext"; 
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/utils/auth/axiosInstance";
// import { API_ROUTES } from "@/config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";

// const SuggestedUsersPage = () => {
//   const { state: authState } = useAuth();
//   const { fetchProfile } = useUser(); // 🔑 Ensure this line is exactly as written here
//   const router = useRouter();
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchSuggestedUsers = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.get(
//         `${API_ROUTES.FOLLOW_SERVICE.NON_FOLLOWED_USERS}?userId=${authState.user.userId}`
//       );
//       if (response.data.success) {
//         setSuggestedUsers(response.data.data);
//       } else {
//         setError(response.data.message || "Failed to fetch suggested users.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching suggested users.");
//     } finally {
//       setLoading(false);
//     }
//   }, [authState.user?.userId]);

//   const handleFollow = useCallback(async (followedUserId) => {
//     // Optimistic UI update: remove user from list immediately
//     const updatedUsers = suggestedUsers.filter(user => user.userId !== followedUserId);
//     setSuggestedUsers(updatedUsers);
    
//     // Get the current user's ID from the auth state
//     const followerId = authState.user.userId;

//     try {
//       const response = await axiosInstance.post(
//         API_ROUTES.FOLLOW_SERVICE.FOLLOW,
//         { 
//           followerId: followerId,
//           followingId: followedUserId
//         },
//       );
//       if (response.data.success) {
//         console.log("Successfully followed user.");
//         fetchProfile(); // 🔑 This is the line that needs fetchProfile to be a function
//       } else {
//         console.error("Follow failed with server message:", response.data.message);
//         setSuggestedUsers(prevUsers => [...prevUsers, suggestedUsers.find(user => user.userId === followedUserId)]);
//         setError(response.data.message || "Error following user.");
//       }
//     } catch (err) {
//       console.error("Follow error:", err.message);
//       setSuggestedUsers(prevUsers => [...prevUsers, suggestedUsers.find(user => user.userId === followedUserId)]);
//       setError(err.response?.data?.message || "Error following user.");
//     }
//   }, [suggestedUsers, fetchProfile, authState]);

//   useEffect(() => {
//     if (authState.isAuthenticated && authState.user?.userId) {
//       fetchSuggestedUsers();
//     } else if (!authState.loading) {
//       router.push("/");
//     }
//   }, [authState, router, fetchSuggestedUsers]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500">
//         <p>{error}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto p-4 max-w-lg">
//       <h1 className="text-2xl font-bold text-center mb-6">Suggested Users</h1>
//       <div className="space-y-4">
//         {suggestedUsers.length > 0 ? (
//           suggestedUsers.map((user) => (
//             <div key={user.userId} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
//               <div>
//                 <h2 className="text-lg font-semibold">{user.userName}</h2>
//                 <p className="text-gray-500">{user.email}</p>
//               </div>
//               <button
//                 onClick={() => handleFollow(user.userId)}
//                 className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
//                 aria-label={`Follow ${user.userName}`}
//               >
//                 <FontAwesomeIcon icon={faUserPlus} />
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No users to suggest right now.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuggestedUsersPage;
