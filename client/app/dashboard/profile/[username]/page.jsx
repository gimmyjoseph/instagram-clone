"use client";

import UserDashboard from "@/components/dashboard/profile/UserDashboard";

export default function OtherUserProfilePage({ params }) {
  const { username } = params; // dynamic segment

  return <UserDashboard username={username} />;
}
