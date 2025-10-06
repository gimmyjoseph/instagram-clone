
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/auth/axiosInstance";
import { useUser } from "@/context/UserContext";
import { MoreVertical } from "lucide-react";

const BACKEND_URL = "http://localhost:8080";

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { state: { user } } = useUser();

  const [isLiked, setIsLiked] = useState(
    post.likes?.some((like) => like.userId === user?.userId) || false
  );
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newCaption, setNewCaption] = useState(post.caption || "");

  const [showLikers, setShowLikers] = useState(false);
  const [likers, setLikers] = useState([]);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const imagePath = post.imageUrl || post.content;
  const finalUrl = imagePath
    ? `${BACKEND_URL}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`
    : null;

  const userInitial = post.username?.charAt(0).toUpperCase() || "?";

  // ---------------- Like / Unlike ----------------
  const handleLike = async () => {
    if (!user?.userId) return alert("Please log in to like posts.");
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/v1/posts/like/${post.id}/${user.userId}`
      );
      if (response.data.success) {
        setIsLiked(!isLiked);
        setLikeCount(response.data.data);
        onUpdate && onUpdate(post.id, { isLiked: !isLiked, likeCount: response.data.data });
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Fetch Likers ----------------
  const fetchLikers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/v1/posts/likes/${post.id}`);
      if (response.data.success) {
        setLikers(response.data.data);
        setShowLikers(true);
      }
    } catch (error) {
      console.error("Error loading likers:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Delete Post ----------------
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/posts/${post.id}/${user.userId}`
      );
      if (response.data.success) {
        onDelete && onDelete(post.id);
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    } finally {
      setShowConfirm(false);
    }
  };

  // ---------------- Edit Caption ----------------
  const handleEdit = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/posts/caption/${post.id}/${user.userId}`,
        { caption: newCaption }
      );
      if (response.data.success) {
        onUpdate && onUpdate(post.id, { caption: newCaption });
        setShowEdit(false);
      }
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
    }
  };

  // ---------------- Fetch Comments ----------------
  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/posts/comments/${post.id}`);
      if (response.data.success) setComments(response.data.data);
    } catch (err) {
      console.error("Fetch comments error:", err.response?.data || err.message);
    }
  };

  // ---------------- Add Comment ----------------
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const response = await axiosInstance.post(
        `/api/v1/posts/comment/${post.id}/${user.userId}`,
        { text: commentText }
      );
      if (response.data.success) {
        setComments(prev => [...prev, response.data.data]);
        setCommentText("");
      }
    } catch (err) {
      console.error("Add comment error:", err.response?.data || err.message);
    }
  };

  // ---------------- Delete Comment ----------------
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/posts/comment/${post.id}/${user.userId}/${commentId}`
      );
      if (response.data.success) {
        setComments(prev => prev.filter(c => c.commentId !== commentId));
      }
    } catch (err) {
      console.error("Delete comment error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 mb-4 border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-lg">
            {userInitial}
          </div>
          {/* ✅ Correct profile link */}
          <Link
            href={`/dashboard/profile/${post.username}`}
            className="font-semibold text-gray-800 hover:underline"
          >
            {post.username || "Unknown User"}
          </Link>
        </div>

        {user?.userId === post.userId && (
          <div className="relative">
            <button onClick={() => setShowMenu(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200">
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setShowEdit(true); setShowMenu(false); }}>Edit</button>
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" onClick={() => { setShowConfirm(true); setShowMenu(false); }}>Delete</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setShowMenu(false)}>Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image */}
      {finalUrl && <img src={finalUrl} alt="Post" className="w-full rounded my-2" />}

      {/* Likes */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={handleLike} disabled={loading} className={`px-2 py-1 rounded ${isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"}`}>
          {isLiked ? "Unlike" : "Like"}
        </button>
        <span onClick={fetchLikers} className="cursor-pointer text-blue-600 hover:underline">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="text-gray-800">
          <Link
            href={`/dashboard/profile/${post.username}`}
            className="font-bold text-blue-600 mr-2 hover:underline"
          >
            {post.username}
          </Link>
          {post.caption}
        </p>
      )}

      {/* Comments */}
      <div className="mt-2">
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {comments.map(comment => (
            <div key={comment.commentId} className="flex justify-between items-start bg-gray-100 p-2 rounded">
              <div>
                <Link
                  href={`/dashboard/profile/${comment.username}`}
                  className="font-bold text-blue-600 mr-1 hover:underline"
                >
                  {comment.username}
                </Link>
                <span>{comment.text}</span>
              </div>
              {(user.userId === comment.userId || user.userId === post.userId) && (
                <button 
                  onClick={() => handleDeleteComment(comment.commentId)} 
                  className="text-red-600 text-sm ml-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex mt-2 gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button onClick={handleAddComment} className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
        </div>
      </div>

      {/* Likers Modal */}
      {showLikers && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Liked by</h2>
            {likers.length === 0 ? <p>No likes yet.</p> : (
              <ul className="space-y-3">
                {likers.map(liker => (
                  <li key={liker.userId} className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                      {liker.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/profile/${liker.username}`}
                        className="text-lg font-medium text-gray-900 hover:underline"
                      >
                        {liker.username}
                      </Link>
                      <p className="text-sm text-gray-500">{liker.fullName || ""}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowLikers(false)} className="mt-4 bg-gray-200 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Delete Post?</h2>
            <p className="mb-4 text-gray-600">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Caption Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Caption</h2>
            <textarea
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
