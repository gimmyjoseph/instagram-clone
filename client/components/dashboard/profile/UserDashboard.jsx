

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faExclamationCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const { logout } = useAuth();
  const { state, fetchProfile } = useUser();
  const { user, error, loading } = state;
  const router = useRouter();

  console.log("UserDashboard state:", { user, error, loading, timestamp: new Date().toISOString() });

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = (path) => {
    if (user?.userId) {
      router.push(path);
    } else {
      console.error(`Navigation failed: User ID is missing. User object:`, user);
    }
  };

  const isReady = !loading && user?.userId;

  // 🔑 FIX: Add a separate condition for when user is null, but not loading or an error
  // This handles the post-logout state before redirection
  if (!isReady && !loading && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 font-medium">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {loading ? (
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center animate-pulse">
            <FontAwesomeIcon icon={faSpinner} className="text-white text-xl animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      ) : error ? (
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-red-400 flex items-center justify-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="text-white text-xl" />
          </div>
          <p className="text-red-500 font-medium">{error || "Unable to load your profile."}</p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={fetchProfile}
              className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium px-6 py-2 hover:bg-blue-100 transition-colors"
            >
              Reload Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium px-6 py-2 hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[600px] flex flex-col gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{user.userName}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleNavigation(`/dashboard/followers/${user.userId}`)}
                className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isReady}
              >
                Followers: {user.followerCount || 0}
              </button>
              <button
                onClick={() => handleNavigation(`/dashboard/followings/${user.userId}`)}
                className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isReady}
              >
                Following: {user.followingCount || 0}
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => handleNavigation("/dashboard/suggested")}
                className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isReady}
              >
                Suggested
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium px-4 py-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

// // // components/dashboard/UserDashboard.js
// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import { useUser } from "@/context/UserContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faExclamationCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

// const UserDashboard = () => {
//   const { logout } = useAuth();
//   const { state, fetchProfile } = useUser();
//   const { user, error, loading } = state;
//   const router = useRouter();

//   console.log("UserDashboard state:", { user, error, loading, timestamp: new Date().toISOString() });

//   const handleLogout = () => {
//     logout();
//   };

//   const handleNavigation = (path) => {
//     if (user?.userId) {
//       router.push(path);
//     } else {
//       console.error(`Navigation failed: User ID is missing. User object:`, user);
//     }
//   };

//   const isReady = !loading && user?.userId;

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       {loading ? (
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center animate-pulse">
//             <FontAwesomeIcon icon={faSpinner} className="text-white text-xl animate-spin" />
//           </div>
//           <p className="text-gray-600 font-medium">Loading your profile...</p>
//         </div>
//       ) : error ? (
//         <div className="text-center max-w-md">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-red-400 flex items-center justify-center">
//             <FontAwesomeIcon icon={faExclamationCircle} className="text-white text-xl" />
//           </div>
//           <p className="text-red-500 font-medium">{error || "Unable to load your profile."}</p>
//           <div className="mt-6 flex justify-center gap-4">
//             <button
//               onClick={fetchProfile}
//               className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium px-6 py-2 hover:bg-blue-100 transition-colors"
//             >
//               Reload Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium px-6 py-2 hover:bg-red-100 transition-colors"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="w-[600px] flex flex-col gap-5">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
//                 <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">{user.userName}</h1>
//                 <p className="text-gray-600">{user.email}</p>
//               </div>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => handleNavigation(`/dashboard/followers/${user.userId}`)}
//                 className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!isReady}
//               >
//                 Followers: {user.followerCount || 0}
//               </button>
//               <button
//                 onClick={() => handleNavigation(`/dashboard/followings/${user.userId}`)}
//                 className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!isReady}
//               >
//                 Following: {user.followingCount || 0}
//               </button>
//             </div>
//             <div className="mt-4 flex justify-center gap-4">
//               <button
//                 onClick={() => handleNavigation("/dashboard/suggested")}
//                 className="bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!isReady}
//               >
//                 Suggested
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium px-4 py-2"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;
