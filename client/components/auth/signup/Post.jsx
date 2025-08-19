
// "use client"
// import { useAuth } from '@/context/AuthContext';
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faImage, 
//   faMapMarkerAlt, 
//   faSmile, 
//   faTimes,
//   faCamera,
//   faPlus
// } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const Post = () => {
//   const [describe, setDescribe] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const { state } = useAuth();
//   const router=useRouter();

//   const submit = async (e) => {
//     e.preventDefault();
    
//     if (!describe.trim()) return;

//     setLoading(true);
//     setSuccess(false);

//     const newPosts = {
//       userId: state.user.userId,
//       posts: [
//         { description: describe }
//       ]
//     };

//     try {
//       const response = await axios.post("http://localhost:8080/api/addPosts", newPosts);
//       console.log(response.data);
//       setDescribe('');
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//       router.push('/allPosts')
//     } catch (error) {
//       console.error("Error posting data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-lg mx-auto bg-white min-h-screen">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
//           <div className="flex items-center justify-between p-4">
//             <FontAwesomeIcon 
//               icon={faTimes} 
//               className="text-gray-700 text-xl cursor-pointer hover:text-gray-900 transition-colors"
//             />
//             <h1 className="text-lg font-semibold text-gray-900">New Post</h1>
//             <button
//               onClick={submit}
//               disabled={!describe.trim() || loading}
//               className={`font-semibold text-sm px-4 py-2 rounded-lg transition-all ${
//                 describe.trim() && !loading
//                   ? 'text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 shadow-md hover:shadow-lg'
//                   : 'text-gray-400 bg-gray-100 cursor-not-allowed'
//               }`}
//             >
//               {loading ? 'Sharing...' : 'Share'}
//             </button>
//           </div>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="mx-4 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
//               <span className="text-green-800 text-sm font-medium">Post shared successfully!</span>
//             </div>
//           </div>
//         )}

//         <form onSubmit={submit} className="p-4 space-y-6">
//           {/* User Info */}
//           <div className="flex items-center">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-0.5 mr-3">
//               <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
//                 <span className="text-sm font-semibold text-gray-700">
//                   {state.user?.username?.[0]?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-900 text-sm">
//                 {state.user?.username || 'User'}
//               </p>
//               <p className="text-gray-500 text-xs">Share a moment...</p>
//             </div>
//           </div>

//           {/* Image Placeholder */}
//           <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all group">
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
//               </div>
//               <p className="text-gray-600 font-medium mb-1">Add Photo</p>
//               <p className="text-gray-400 text-sm">Click to select from your device</p>
//             </div>
//           </div>

//           {/* Caption Input */}
//           <div className="space-y-4">
//             <textarea
//               placeholder="Write a caption..."
//               name="describe"
//               value={describe}
//               onChange={(e) => setDescribe(e.target.value)}
//               rows={4}
//               className="w-full p-4 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50 focus:bg-white transition-colors"
//             />
//             <div className="flex justify-between items-center text-sm text-gray-500">
//               <span>{describe.length}/2200</span>
//               <span className="text-xs">Write something inspiring...</span>
//             </div>
//           </div>

//           {/* Additional Options */}
//           <div className="space-y-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 transition-colors">
//               <div className="flex items-center">
//                 <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 mr-3" />
//                 <span className="text-gray-700">Add Location</span>
//               </div>
//               <FontAwesomeIcon icon={faPlus} className="text-gray-400" />
//             </div>
            
//             <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 transition-colors">
//               <div className="flex items-center">
//                 <FontAwesomeIcon icon={faSmile} className="text-gray-600 mr-3" />
//                 <span className="text-gray-700">Tag People</span>
//               </div>
//               <FontAwesomeIcon icon={faPlus} className="text-gray-400" />
//             </div>
//           </div>

//           {/* Advanced Settings */}
//           <div className="space-y-3 pt-4 border-t border-gray-100">
//             <h3 className="text-sm font-semibold text-gray-900 mb-3">Advanced Settings</h3>
            
//             <label className="flex items-center justify-between cursor-pointer">
//               <span className="text-gray-700 text-sm">Hide like and view counts</span>
//               <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
//             </label>
            
//             <label className="flex items-center justify-between cursor-pointer">
//               <span className="text-gray-700 text-sm">Turn off commenting</span>
//               <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
//             </label>
//           </div>
//         </form>

//         {/* Bottom Action Button (Alternative) */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
//           <button
//             onClick={submit}
//             disabled={!describe.trim() || loading}
//             className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all transform ${
//               describe.trim() && !loading
//                 ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 hover:scale-105 shadow-lg hover:shadow-xl'
//                 : 'bg-gray-300 cursor-not-allowed'
//             }`}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Sharing Post...
//               </>
//             ) : (
//               'Share Post'
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;

"use client";
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Post = () => {
  const [describe, setDescribe] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { state } = useAuth();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    
    if (!describe.trim()) return;

    setLoading(true);
    setSuccess(false);

    const newPosts = {
      userId: state.user.userId,
      posts: [{ description: describe }],
    };

    try {
      const response = await axios.post("http://localhost:8080/api/addPosts", newPosts);
      console.log(response.data);
      setDescribe('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.push('/allPosts');
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <FontAwesomeIcon
            icon={faTimes}
            className="text-gray-600 text-lg cursor-pointer hover:text-gray-800"
          />
          <h1 className="text-lg font-semibold text-gray-900">New Post</h1>
          <button
            onClick={submit}
            disabled={!describe.trim() || loading}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              describe.trim() && !loading
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-4 mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <span className="text-green-700 text-sm font-medium">Post shared successfully!</span>
          </div>
        )}

        <form onSubmit={submit} className="p-4 space-y-4">
          {/* User Info */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <span className="text-white font-semibold">
                {state.user?.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {state.user?.username || 'User'}
              </p>
              <p className="text-gray-500 text-xs">Share your thoughts...</p>
            </div>
          </div>

          {/* Caption Input */}
          <div>
            <textarea
              placeholder="What's on your mind?"
              name="describe"
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              rows={5}
              className="w-full p-3 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="text-gray-500 text-xs mt-1">
              {describe.length}/2200
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;