// import HomeFeed from '@/components/dashboard/profile/HomeFeed'
// import React from 'react'

// export default function homefeed() {
//     return <HomeFeed />;
//   }
"use client";

import React from "react";
import HomeFeed from "@/components/dashboard/profile/HomeFeed";
import SuggestedUsers from "@/components/follow/SuggestedUsers";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Feed */}
      <div className="md:col-span-2">
        <HomeFeed />
      </div>

      {/* Suggested Users */}
      <div className="hidden md:block">
        <SuggestedUsers />
      </div>
    </div>
  );
};

export default HomePage;
