

// // app/dashboard/followers/[userId]/page.js
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useUser } from "@/context/UserContext";
// import axiosInstance from "@/utils/auth/axiosInstance";
// import { API_ROUTES } from "@/config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner, faUsers, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// const FollowersPage = () => {
//   const { userId } = useParams();
//   const router = useRouter();
//   const { state: userState } = useUser();
//   const [followers, setFollowers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchFollowers = useCallback(async (id) => {
//     if (!id) {
//       console.error("User ID from URL is missing.");
//       setError("User profile not found. Please try again.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.get(`${API_ROUTES.FOLLOW_SERVICE.FOLLOWERS.replace("{userId}", id)}`);
//       if (response.data.success) {
//         setFollowers(response.data.data);
//       } else {
//         setError(response.data.message || "Failed to fetch followers.");
//       }
//     } catch (err) {
//       console.error("Followers fetch error:", err);
//       const message = err.response?.data?.message || err.message || "Network error. Please check your connection.";
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (userState.user?.userId || userId) {
//       fetchFollowers(userId);
//     }
//   }, [userId, fetchFollowers, userState.user]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin" />
//           <p className="mt-4 text-gray-600">Loading followers...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <p className="text-red-500 text-lg text-center mb-4">{error}</p>
//         <button
//           onClick={() => router.back()}
//           className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//       <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
//         <div className="flex items-center justify-between mb-6">
//           <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 transition-colors">
//             <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
//           </button>
//           <h1 className="text-2xl font-semibold text-gray-800">Followers</h1>
//           <div className="w-6"></div> {/* Spacer for alignment */}
//         </div>

//         {followers.length > 0 ? (
//           <ul className="space-y-4">
//             {followers.map((follower) => (
//               <li key={follower.id} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
//                 <div className="flex-shrink-0 w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">
//                   <FontAwesomeIcon icon={faUsers} />
//                 </div>
//                 <div className="flex-grow">
//                   <h2 className="text-lg font-medium text-gray-900">{follower.userName}</h2>
//                   <p className="text-sm text-gray-500">{follower.fullName}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="text-center text-gray-500 py-10">
//             <p>No followers found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FollowersPage;

// app/dashboard/followers/[userId]/page.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUsers, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const FollowersPage = () => {
  const { userId } = useParams();
  const router = useRouter();
  const { state: userState } = useUser();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await axiosInstance.get(`${API_ROUTES.FOLLOW_SERVICE.FOLLOWERS.replace("{userId}", id)}`);
      if (response.data.success) {
        setFollowers(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch followers.");
      }
    } catch (err) {
      console.error("Followers fetch error:", err);
      const message = err.response?.data?.message || err.message || "Network error. Please check your connection.";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin" />
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
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 transition-colors">
            <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Followers</h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>

        {followers.length > 0 ? (
          <ul className="space-y-4">
            {followers.map((follower) => (
              // 🔑 Fix: Using userId as the unique key
              <li key={follower.userId || follower.id} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-gray-900">{follower.userName}</h2>
                  <p className="text-sm text-gray-500">{follower.fullName}</p>
                </div>
              </li>
            ))}
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