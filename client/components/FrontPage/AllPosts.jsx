"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const AllPosts = () => {
  const { state } = useAuth();
  const [posts, setPosts] = useState([]);

  // Fetch posts for the logged-in user
  useEffect(() => {
    if (!state?.user?.userId) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/get/${state.user.userId}`
        );
        setPosts(res.data.data.posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [state?.user?.userId]);

  // Like / Unlike handler with rollback on failure
  const handleLike = async (postId) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: (post.likes || 0) + (post.liked ? -1 : 1),
          }
        : post
    );

    setPosts(updatedPosts); // Optimistic update

    try {
      await axios.post(
        `http://localhost:8080/api/addLikes/${state.user.userId}/${postId}`
      );
    } catch (err) {
      console.error("Error liking post:", err);
      setPosts(posts); // Rollback on failure
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <h1 className="text-lg font-semibold text-gray-900 text-center">
            Your Posts
          </h1>
        </div>

        {/* Posts List */}
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post._id || Math.random()} className="p-4">
              {/* User Info */}
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-semibold">
                    {state.user?.username?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="font-semibold text-sm text-gray-900">
                  {state.user?.username || "You"}
                </span>
              </div>

              {/* Post Content */}
              <div className="text-sm text-gray-900 mb-3">
                <span className="font-semibold mr-2">
                  {state.user?.username || "You"}
                </span>
                <span>{post.description}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={post.liked ? faHeartSolid : faHeart}
                    className={`text-lg ${
                      post.liked ? "text-red-500" : "text-gray-600"
                    }`}
                  />
                  <span className="text-sm text-gray-600">
                    {post.likes || 0} {post.likes === 1 ? "like" : "likes"}
                  </span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                  <FontAwesomeIcon icon={faComment} className="text-lg text-gray-600" />
                  <span className="text-sm text-gray-600">Comment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-500 font-medium">No posts yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Share your first thought!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
// import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

// const AllPosts = () => {
//   const { state } = useAuth();
//   const [posts, setPosts] = useState([]);

//   // Fetch posts for the logged-in user
//   useEffect(() => {
//     if (!state?.user?.userId) return;

//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/api/get/${state.user.userId}`
//         );
//         setPosts(res.data.data.posts || []);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };

//     fetchPosts();
//   }, [state?.user?.userId]);

//   // Like / Unlike handler with rollback on failure
//   const handleLike = async (postId) => {
//     const updatedPosts = posts.map((post) =>
//       post._id === postId
//         ? {
//             ...post,
//             liked: !post.liked,
//             likes: (post.likes || 0) + (post.liked ? -1 : 1),
//           }
//         : post
//     );

//     setPosts(updatedPosts); // optimistic update

//     try {
//       await axios.post(
//         `http://localhost:8080/api/addLikes/${state.user.userId}/${postId}`
//       );
//     } catch (err) {
//       console.error("Error liking post:", err);
//       // rollback if API fails
//       setPosts(posts);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-lg mx-auto bg-white min-h-screen">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 z-10 p-4">
//           <h1 className="text-lg font-semibold text-gray-900 text-center">
//             Your Posts
//           </h1>
//         </div>

//         {/* Posts List */}
//         <div className="divide-y divide-gray-200">
//           {posts.map((post) => (
//             <div key={post._id || Math.random()} className="bg-white p-4">
//               {/* User Info */}
//               <div className="flex items-center mb-3">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-0.5 mr-3">
//                   <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
//                     <span className="text-xs font-semibold text-gray-700">
//                       {state.user?.username?.[0]?.toUpperCase() || "U"}
//                     </span>
//                   </div>
//                 </div>
//                 <span className="font-semibold text-sm text-gray-900">
//                   {state.user?.username || "You"}
//                 </span>
//               </div>

//               {/* Post Image Placeholder */}
//               <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
//                     <FontAwesomeIcon icon={faComment} className="text-white" />
//                   </div>
//                   <span className="text-gray-500 text-sm">Post Image</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center space-x-4 mb-2">
//                 <button
//                   onClick={() => handleLike(post._id)}
//                   className="flex items-center space-x-1 hover:scale-110 transition-transform"
//                 >
//                   <FontAwesomeIcon
//                     icon={post.liked ? faHeartSolid : faHeart}
//                     className={`text-xl ${
//                       post.liked ? "text-red-500" : "text-gray-700"
//                     }`}
//                   />
//                 </button>
//                 <button className="hover:scale-110 transition-transform">
//                   <FontAwesomeIcon
//                     icon={faComment}
//                     className="text-xl text-gray-700"
//                   />
//                 </button>
//               </div>

//               {/* Likes Count */}
//               <div className="font-semibold text-sm text-gray-900 mb-2">
//                 {post.likes || 0}{" "}
//                 {(post.likes || 0) === 1 ? "like" : "likes"}
//               </div>

//               {/* Caption */}
//               <div className="text-sm text-gray-900">
//                 <span className="font-semibold mr-2">
//                   {state.user?.username || "You"}
//                 </span>
//                 <span>{post.description}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {posts.length === 0 && (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faComment}
//                   className="text-white text-xl"
//                 />
//               </div>
//               <p className="text-gray-500 font-medium">No posts yet</p>
//               <p className="text-gray-400 text-sm mt-1">
//                 Share your first moment!
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllPosts;


// // "use client";

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useAuth } from "@/context/AuthContext";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faHeart } from "@fortawesome/free-regular-svg-icons";
// // import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

// // const AllPosts = () => {
// //   const { state } = useAuth();
// //   const [posts, setPosts] = useState([]);

// //   // Fetch posts for the logged-in user
// //   useEffect(() => {
// //     if (!state?.user?.userId) return;

// //     const fetchPosts = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:8080/api/get/${state.user.userId}`
// //         );
// //         setPosts(res.data.data.posts || []);
// //       } catch (err) {
// //         console.error("Error fetching posts:", err);
// //       }
// //     };

// //     fetchPosts();
// //   }, [state?.user?.userId]);

// //   // Like / Unlike handler with rollback on failure
// //   const handleLike = async (postId) => {
// //     const updatedPosts = posts.map((post) =>
// //       post._id === postId
// //         ? {
// //             ...post,
// //             liked: !post.liked,
// //             likes: (post.likes || 0) + (post.liked ? -1 : 1),
// //           }
// //         : post
// //     );

// //     setPosts(updatedPosts); // Optimistic update

// //     try {
// //       await axios.post(
// //         `http://localhost:8080/api/addLikes/${state.user.userId}/${postId}`
// //       );
// //     } catch (err) {
// //       console.error("Error liking post:", err);
// //       // Rollback if API fails
// //       setPosts(posts);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-lg mx-auto bg-white min-h-screen">
// //         {/* Header */}
// //         <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
// //           <h1 className="text-lg font-semibold text-gray-900 text-center">
// //             Your Posts
// //           </h1>
// //         </div>

// //         {/* Posts List */}
// //         <div className="divide-y divide-gray-200">
// //           {posts.map((post) => (
// //             <div key={post._id || Math.random()} className="p-4">
// //               {/* User Info */}
// //               <div className="flex items-center mb-2">
// //                 <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
// //                   <span className="text-xs font-semibold text-gray-700">
// //                     {state.user?.username?.[0]?.toUpperCase() || "U"}
// //                   </span>
// //                 </div>
// //                 <span className="font-semibold text-sm text-gray-900">
// //                   {state.user?.username || "You"}
// //                 </span>
// //               </div>

// //               {/* Description in a Box */}
// //               <div className="text-sm text-gray-900 mb-2 p-3 border border-gray-300 rounded-md bg-gray-50">
// //                 {post.description || "No caption provided"}
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex items-center space-x-4 mb-2">
// //                 <button
// //                   onClick={() => handleLike(post._id)}
// //                   className="flex items-center space-x-1 hover:scale-110 transition-transform"
// //                 >
// //                   <FontAwesomeIcon
// //                     icon={post.liked ? faHeartSolid : faHeart}
// //                     className={`text-xl ${
// //                       post.liked ? "text-red-500" : "text-gray-700"
// //                     }`}
// //                   />
// //                 </button>
// //               </div>

// //               {/* Likes Count */}
// //               <div className="font-semibold text-sm text-gray-900">
// //                 {post.likes || 0}{" "}
// //                 {(post.likes || 0) === 1 ? "like" : "likes"}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Empty State */}
// //         {posts.length === 0 && (
// //           <div className="flex items-center justify-center py-20">
// //             <div className="text-center">
// //               <p className="text-gray-500 font-medium">No posts yet</p>
// //               <p className="text-gray-400 text-sm mt-1">
// //                 Share your first moment!
// //               </p>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllPosts;