

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
//     console.log("UserDashboard useEffect - user:", user, "loading:", loading, "error:", error);
//     if (!user && !loading) {
//       console.log("Fetching profile...");
//       fetchProfile().catch((err) => {
//         console.error("Failed to fetch profile:", err);
//         router.push("/login");
//       });
//     }
//   }, [user, loading, fetchProfile, router]);

//   const handleLogout = async () => {
//     if (isLoggingOut) return;
//     setIsLoggingOut(true);
//     try {
//       console.log("Initiating logout...");
//       await logout();
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       setIsLoggingOut(false);
//     }
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

//   if (!user) {
//     console.log("No user data, returning null");
//     return null; // Redirect handled in useEffect
//   }

//   // Log user data for debugging
//   console.log("Rendering user data:", user);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8">
//         <h1 className="text-3xl font-bold text-gray-900 text-center">
//           Welcome, {user.first_name || user.userName || "User"} {user.last_name || ""}
//         </h1>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <p className="text-gray-700">
//             <span className="font-medium">Username:</span> {user.userName || "N/A"}
//           </p>
//           {user.email && (
//             <p className="text-gray-700">
//               <span className="font-medium">Email:</span> {user.email}{" "}
//               {user.emailVerified ? (
//                 <span className="text-green-500">(Verified)</span>
//               ) : (
//                 <span className="text-red-500">(Not Verified)</span>
//               )}
//             </p>
//           )}
//           {user.phoneNumber && (
//             <p className="text-gray-700">
//               <span className="font-medium">Phone:</span> {user.phoneNumber}{" "}
//               {user.isPhoneVerified ? (
//                 <span className="text-green-500">(Verified)</span>
//               ) : (
//                 <span className="text-red-500">(Not Verified)</span>
//               )}
//             </p>
//           )}
//           <p className="text-gray-700">
//             <span className="font-medium">Full Name:</span> {user.fullName || "N/A"}
//           </p>
//         </div>
//         <button
//           onClick={handleLogout}
//           disabled={isLoggingOut}
//           className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//             isLoggingOut ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
//           } focus:outline-none focus:ring-2 focus:ring-red-500`}
//         >
//           {isLoggingOut ? "Logging Out..." : "Logout"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";

export default function UserDashboard() {
  const { state, fetchProfile } = useUser();
  const { user, loading, error } = state;
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    console.log("UserDashboard useEffect - user:", user, "loading:", loading, "error:", error);
    if (!user && !loading) {
      console.log("Fetching profile...");
      fetchProfile()
        .then(() => console.log("Profile fetched successfully"))
        .catch((err) => {
          console.error("Failed to fetch profile:", err.message);
          router.push("/login");
        });
    }
  }, [user, loading, fetchProfile, router]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      console.log("Initiating logout...");
      await logout();
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-red-700 font-medium">Error: {error}</span>
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("No user data, returning null");
    return null; // Redirect handled in useEffect
  }

  // Validate email or phoneNumber
  const hasEmail = !!user.email;
  const hasPhone = !!user.phoneNumber;
  if (hasEmail === hasPhone) {
    console.error("Invalid user data: User must have exactly one of email or phoneNumber", user);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-red-700 font-medium">
              Error: Invalid profile. Please update your contact information.
            </span>
            <button
              onClick={() => router.push("/profile/edit")}
              className="text-blue-600 hover:underline"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log("Rendering user data:", user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome, {user.fullName || user.userName || "User"}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            <span className="font-medium">Username:</span> {user.userName || "N/A"}
          </p>
          {hasEmail && (
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {user.email}{" "}
              {user.emailVerified ? (
                <span className="text-green-500">(Verified)</span>
              ) : (
                <span className="text-red-500">(Not Verified)</span>
              )}
            </p>
          )}
          {hasPhone && (
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {user.phoneNumber}{" "}
              {user.isPhoneVerified ? (
                <span className="text-green-500">(Verified)</span>
              ) : (
                <span className="text-red-500">(Not Verified)</span>
              )}
            </p>
          )}
          <p className="text-gray-700">
            <span className="font-medium">Full Name:</span> {user.fullName || "N/A"}
          </p>
          {!user.fullName && (
            <p className="text-gray-700">
              <span className="font-medium">Note:</span> Please update your profile to add a full name.
              <button
                onClick={() => router.push("/profile/edit")}
                className="ml-2 text-blue-600 hover:underline"
              >
                Edit Profile
              </button>
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoggingOut ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
        >
          {isLoggingOut ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}