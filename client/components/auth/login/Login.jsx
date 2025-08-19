
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { useAuth } from "@/context/AuthContext";

// export default function Login() {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [localError, setLocalError] = useState("");
//   const { state: authState, signin, clearState } = useAuth();
//   const { error, loading, success } = authState;
//   const router = useRouter();

//   useEffect(() => {
//     clearState();
//     setLocalError("");
//   }, [clearState]);

//   const validateIdentifier = (input) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
//     const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
//     return emailRegex.test(input) || phoneRegex.test(input) || usernameRegex.test(input);
//   };

//   useEffect(() => {
//     if (identifier && !validateIdentifier(identifier)) {
//       setLocalError("Please enter a valid phone number, username, or email");
//     } else {
//       setLocalError("");
//     }
//   }, [identifier]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateIdentifier(identifier)) {
//       setLocalError("Please enter a valid phone number, username, or email");
//       return;
//     }
//     const response = await signin(identifier, password);
//     if (response.status === 200) {
//       router.push("/dashboard/profile");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
//         <img
//           src="https://via.placeholder.com/150x50?text=Nstayz"
//           alt="instagram"
//           className="mx-auto h-12 mb-6"
//         />
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               className={`w-full p-3 bg-white border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none ${
//                 localError || error ? "border-red-400" : "border-gray-300"
//               } focus:border-blue-400`}
//               placeholder="Phone number, username, or email"
//               required
//               aria-invalid={localError || error ? "true" : "false"}
//             />
//           </div>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400"
//               placeholder="Password"
//               required
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-600" />
//             </span>
//           </div>
//           {(localError || error) && (
//             <p className="text-sm text-red-500 text-center">{localError || error}</p>
//           )}
//           {success && <p className="text-sm text-green-500 text-center">{success}</p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 mr-2 text-white"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//               </svg>
//             ) : null}
//             {loading ? "Signing In..." : "Log In"}
//           </button>
//         </form>
//         <div className="flex items-center justify-center my-4">
//           <div className="border-t border-gray-300 w-1/3"></div>
//           <span className="mx-4 text-gray-500 text-sm">OR</span>
//           <div className="border-t border-gray-300 w-1/3"></div>
//         </div>
//         <button
//           type="button"
//           className="w-full py-3 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"
//         >
//           Log in with Facebook
//         </button>
//         <div className="text-center space-y-2 mt-4">
//           <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
//             Forgot password?
//           </a>
//           <p className="text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <a href="/signup" className="text-blue-500 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const { state: authState, signin, clearState } = useAuth();
  const { error, loading, success } = authState;
  const router = useRouter();

  useEffect(() => {
    clearState();
    setLocalError("");
  }, [clearState]);

  const validateIdentifier = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    return emailRegex.test(input) || phoneRegex.test(input) || usernameRegex.test(input);
  };

  useEffect(() => {
    if (identifier && !validateIdentifier(identifier)) {
      setLocalError("Please enter a valid phone number, username, or email");
    } else {
      setLocalError("");
    }
  }, [identifier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateIdentifier(identifier)) {
      setLocalError("Please enter a valid phone number, username, or email");
      return;
    }
    const response = await signin(identifier, password);
    if (response?.status === 200) {
      router.push("/dashboard/profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
        <img
          src="https://via.placeholder.com/150x50?text=Nstayz"
          alt="instagram"
          className="mx-auto h-12 mb-6"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`w-full p-3 bg-white border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none ${
                localError || error ? "border-red-400" : "border-gray-300"
              } focus:border-blue-400`}
              placeholder="Phone number, username, or email"
              required
              aria-invalid={localError || error ? "true" : "false"}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-600" />
            </span>
          </div>
          {(localError || error) && (
            <p className="text-sm text-red-500 text-center">{localError || error}</p>
          )}
          {success && <p className="text-sm text-green-500 text-center">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}