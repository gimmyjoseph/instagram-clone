
"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/auth/axiosInstance";

const ChatList = ({ currentUserId, onSelectUser }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/v1/messages/chats/${currentUserId}`);
        if (res.data.success) setChats(res.data.data);
      } catch (err) {
        console.error("Chat list error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [currentUserId]);

  return (
    <div className="w-80 border-r p-2 overflow-y-auto h-[calc(100vh-80px)]">
      <h2 className="font-bold mb-3 text-lg">Chats</h2>
      {loading && <p>Loading...</p>}
      {chats.map((chat) => (
        <div
          key={chat.userId}
          onClick={() => onSelectUser(chat.userId)}
          className="p-2 cursor-pointer hover:bg-gray-100 rounded flex justify-between"
        >
          {/* 👇 Show fullName if available, otherwise fallback to userId */}
          <span>{chat.fullName || chat.userName || chat.userId}</span>
          <span className="text-sm text-gray-500 truncate">{chat.lastMessage}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
