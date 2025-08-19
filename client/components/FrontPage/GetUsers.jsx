"use client"; // for Next.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:8080"); // backend socket server URL

const GetUsers = () => {
  const [list, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/allUsers");
        console.log(response.data);
        setUserList(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // listen for incoming messages
    socket.on("receiveMessage", (data) => {
      console.log("Message received:", data);
      alert(`${data.from}: ${data.message}`);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!selectedUser || message.trim() === "") return;

    const payload = {
      to: selectedUser.userId,
      message,
      from: "currentUserId", // replace with logged-in userId
    };

    socket.emit("sendMessage", payload);
    console.log("Message sent:", payload);
    setMessage("");
  };

  return (
    <div>
      <p>Chat with people list is here</p>

      {/* Users List */}
      {list.map((user) => (
        <div
          key={user.userId}
          onClick={() => setSelectedUser(user)}
          className={`cursor-pointer p-2 ${
            selectedUser?.userId === user.userId ? "bg-gray-200" : ""
          }`}
        >
          <p>{user.userName}</p>
        </div>
      ))}

      {/* Message Box */}
      {selectedUser && (
        <div className="mt-4">
          <h3>Chat with {selectedUser.userName}</h3>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="border p-2 rounded w-full"
          />
          <button
            onClick={sendMessage}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default GetUsers;