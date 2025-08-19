"use client";

import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const toggleLike = async (postId) => {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/like`, { method: "POST" });
    const updatedPost = await res.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  const addComment = async (postId, text) => {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "you", text }),
    });
    const updatedPost = await res.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-200 rounded mb-6">
          <div className="flex items-center p-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <span className="text-sm font-semibold text-gray-600">{post.username[0]}</span>
            </div>
            <span className="font-semibold">{post.username}</span>
          </div>
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Post Image</span>
          </div>
          <div className="p-4">
            <div className="flex gap-4 mb-2">
              <i
                className="fas fa-heart text-xl cursor-pointer text-red-500"
                onClick={() => toggleLike(post.id)}
              ></i>
              <i className="far fa-comment text-xl"></i>
              <i className="far fa-paper-plane text-xl"></i>
            </div>
            <div className="font-semibold mb-2">{post.likes} likes</div>
            <div className="mb-2">
              <span className="font-semibold">{post.username}</span> {post.caption}
            </div>
            <div className="border-t border-gray-200 pt-2">
              {post.comments.map((comment) => (
                <p key={comment.id}>
                  <span className="font-semibold">{comment.user}</span> {comment.text}
                </p>
              ))}
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border-none p-2 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    addComment(post.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";

// export default function Posts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/posts")
//       .then((res) => res.json())
//       .then((data) => setPosts(data));
//   }, []);

//   const toggleLike = async (postId) => {
//     const res = await fetch(`http://localhost:8080/api/posts/${postId}/like`, { method: "POST" });
//     const updatedPost = await res.json();
//     setPosts((prevPosts) =>
//       prevPosts.map((post) => (post.id === postId ? updatedPost : post))
//     );
//   };

//   const addComment = async (postId, text) => {
//     const res = await fetch(`http://localhost:8080/api/posts/${postId}/comment`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user: "you", text }),
//     });
//     const updatedPost = await res.json();
//     setPosts((prevPosts) =>
//       prevPosts.map((post) => (post.id === postId ? updatedPost : post))
//     );
//   };

//   return (
//     <div className="max-w-xl mx-auto py-4">
//       {posts.map((post) => (
//         <div key={post.id} className="bg-white border border-gray-300 rounded-lg mb-4 p-4 shadow-sm">
//           <div className="flex items-center mb-3">
//             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">

//               <span className="text-sm font-medium text-gray-600">{post.username[0].toUpperCase()}</span>
//             </div>
//             <span className="font-semibold text-gray-800">{post.username}</span>
//           </div>
//           <p className="text-gray-700 mb-3 leading-relaxed">{post.caption}</p>
//           <div className="flex items-center gap-3 mb-3">
//             <button
//               onClick={() => toggleLike(post.id)}
//               className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
//             >
//               <i className="fas fa-heart"></i>
//               <span>{post.likes}</span>
//             </button>
//             <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
//               <i className="far fa-comment"></i>
//               <span>{post.comments.length}</span>
//             </button>
//           </div>
//           <div className="border-t border-gray-200 pt-3">
//             {post.comments.map((comment) => (
//               <p key={comment.id} className="text-sm mb-1">
//                 <span className="font-semibold text-gray-800">{comment.user}</span>
//                 <span className="text-gray-600"> {comment.text}</span>
//               </p>
//             ))}
//             <input
//               type="text"
//               placeholder="Add a comment..."
//               className="w-full border border-gray-200 rounded p-2 mt-2 text-sm focus:outline-none focus:border-blue-400"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter" && e.target.value.trim()) {
//                   addComment(post.id, e.target.value);
//                   e.target.value = "";
//                 }
//               }}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }