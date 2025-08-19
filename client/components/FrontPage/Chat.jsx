
"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <div className="h-64 border overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.id}:</b> {msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-1 mr-2"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;