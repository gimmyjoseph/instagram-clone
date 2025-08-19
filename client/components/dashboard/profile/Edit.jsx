"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function EditProfile() {
  const { state, fetchProfile, updateProfile } = useUser();
  const { user, loading, error } = state;
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (!user && !loading) {
      fetchProfile().catch((err) => {
        console.error("Failed to fetch profile:", err);
        router.push("/");
      });
    } else if (user) {
      setIsPrivate(user.isPrivate || false);
    }
  }, [user, loading, router, fetchProfile]);

  const handleUpdate = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await updateProfile({ isPrivate });
      router.push("/UserDashboard"); // Redirect back to dashboard after successful update
    } catch (err) {
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
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
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Edit Profile
        </h1>
        {updateError && (
          <div className="max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-700 font-medium">{updateError}</span>
          </div>
        )}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPrivate" className="text-gray-700 font-medium">
              Make my profile private
            </label>
          </div>
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
          <button
            onClick={() => router.push("/dashboard/profile")}
            className="w-full py-2 px-4 rounded-md text-white font-medium bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}