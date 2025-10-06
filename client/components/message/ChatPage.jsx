
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const searchParams = useSearchParams();

  // ✅ Logged-in user from context
  const {
    state: { user: loggedInUser },
  } = useUser();

  // ✅ Check if ?to= query exists
  useEffect(() => {
    const toUserId = searchParams.get("to");
    if (toUserId) setSelectedUser(toUserId);
  }, [searchParams]);

  if (!loggedInUser) return <p className="p-4">Loading user...</p>;

  return (
    <div className="flex h-screen">
      <ChatList
        currentUserId={loggedInUser.userId}
        onSelectUser={setSelectedUser}
      />
      {selectedUser ? (
        <ChatWindow
          currentUserId={loggedInUser.userId}
          chatWith={selectedUser}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
