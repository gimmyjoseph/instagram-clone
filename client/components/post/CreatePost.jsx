
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/auth/axiosInstance";

const CreatePost = () => {
  const {
    state: { user },
  } = useUser();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("file", file);
    formData.append("caption", caption);

    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        router.push("/dashboard/profile");
      }
    } catch {
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-4 rounded border"
      >
        <h2 className="text-lg font-bold mb-2">Create Post</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-2"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          placeholder="Add a caption (optional)"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;