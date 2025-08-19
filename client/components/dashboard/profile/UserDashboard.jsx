

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/context/UserContext";
// import { useAuth } from "@/context/AuthContext";

// export default function UserDashboard() {
//   const { state, fetchProfile } = useUser();
//   const { user, loading, error } = state;
//   const { logout } = useAuth();
//   const router = useRouter();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   useEffect(() => {
//     if (!user && !loading) {
//       fetchProfile().catch((err) => {
//         console.error("Failed to fetch profile:", err);
//         router.push("/");
//       });
//     }
//   }, [user, loading]);

//   const handleLogout = async () => {
//     if (isLoggingOut) return;
//     setIsLoggingOut(true);
//     try {
//       await logout();
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   const handleEditProfile = () => {
//     router.push("/dashboard/editprofile");
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="flex items-center space-x-2 text-gray-600">
//           <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center space-x-2">
//             <span className="text-red-700 font-medium">Error: {error}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!user || !user.fullName) {
//     return null; // Redirect handled in useEffect
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8">
//         <h1 className="text-3xl font-bold text-gray-900 text-center">
//           Welcome, {user.fullName}!
//         </h1>
//         <div className="space-y-4">
//           <button
//             onClick={handleEditProfile}
//             className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Edit Profile
//           </button>
//           <button
//             onClick={handleLogout}
//             disabled={isLoggingOut}
//             className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//               isLoggingOut ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
//             } focus:outline-none focus:ring-2 focus:ring-red-500`}
//           >
//             {isLoggingOut ? "Logging Out..." : "Logout"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faEdit,
  faSignOutAlt,
  faCog
} from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const { state, signout } = useAuth();
  const { user } = state;
  const router = useRouter();

  const handleLogout = () => {
    signout();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center animate-pulse">
            <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
          </div>
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon 
                icon={faCog} 
                className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 transition-colors" 
              />
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition-colors"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-6">
          
          {/* Profile Picture & Basic Info */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">
                  {user.fullName?.[0]?.toUpperCase() || user.userName?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {user.fullName || 'User'}
            </h2>
            <p className="text-gray-600 mb-4">@{user.userName || user.username}</p>
            
            {/* Edit Profile Button */}
            <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8 py-4 border-y border-gray-100">
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">0</div>
              <div className="text-gray-600 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">0</div>
              <div className="text-gray-600 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">0</div>
              <div className="text-gray-600 text-sm">Following</div>
            </div>
          </div>

          {/* User Information Cards */}
          <div className="space-y-4">
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faUser} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">User ID</p>
                  <p className="font-medium text-gray-900">{user.userId}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-green-500 to-green-600 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faPhone} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Phone Number</p>
                  <p className="font-medium text-gray-900">{user.phoneNumber || 'Not provided'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              View Posts
            </button>
            <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Account Settings
            </button>
            <button 
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Sign Out
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;