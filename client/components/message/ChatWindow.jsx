
"use client";

import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/utils/auth/axiosInstance";
import { useRouter } from "next/navigation";

const ChatWindow = ({ currentUserId, chatWith }) => {
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null); // 👈 store user details
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/v1/messages/conversation/${currentUserId}/${chatWith}`
      );
      if (res.data.success) setMessages(res.data.data);

      // ✅ fetch user details for header
      const userRes = await axiosInstance.get(`/api/v1/users/${chatWith}`);
      if (userRes.data.success) setChatUser(userRes.data.data);
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axiosInstance.post("/api/v1/messages/send", {
        senderId: currentUserId,
        receiverId: chatWith,
        text: newMessage,
      });
      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  useEffect(() => {
    if (chatWith) fetchMessages();
  }, [chatWith]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] border-l">
      {/* ✅ Chat Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg">
          {chatUser?.userName?.charAt(0).toUpperCase() || "?"}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">
            {chatUser?.fullName || "Unknown User"}
          </span>
          <span className="text-sm text-gray-500">@{chatUser?.userName}</span>
        </div>

        {/* View Profile button */}
        <button
          onClick={() => router.push(`/dashboard/${chatUser?.userName}`)}
          className="ml-auto px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Profile
        </button>
      </div>

      {/* ✅ Messages Section */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {loading && <p>Loading...</p>}
        {messages.map((msg) => (
          <div
            key={msg.id}
            ref={scrollRef}
            className={`p-2 rounded max-w-xs ${
              msg.senderId === currentUserId
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {msg.text}
            <div className="text-xs text-gray-600 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Message Input */}
      <div className="flex gap-2 p-4 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
