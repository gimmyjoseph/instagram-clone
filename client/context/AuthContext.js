


// "use client";

// import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { API_ROUTES } from "@/config";
// import axiosInstance from "@/utils/auth/axiosInstance";

// // Initial State for the authentication context
// const initialState = {
//   loading: false, // Start with loading false to keep form interactive
//   error: null,
//   isAuthenticated: false,
//   user: null,
//   success: null,
// };

// // Action types
// const actionTypes = {
//   LOADING: "LOADING",
//   ERROR: "ERROR",
//   SUCCESS: "SUCCESS",
//   AUTHENTICATED: "AUTHENTICATED",
//   LOGOUT: "LOGOUT",
//   CLEAR_STATE: "CLEAR_STATE",
// };

// // Reducer function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.LOADING:
//       return { ...state, loading: action.payload, error: null, success: null };
//     case actionTypes.ERROR:
//       return { ...state, loading: false, error: action.payload, success: null };
//     case actionTypes.SUCCESS:
//       return { ...state, loading: false, success: action.payload, error: null };
//     case actionTypes.AUTHENTICATED:
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: true,
//         user: action.payload,
//         error: null,
//       };
//     case actionTypes.LOGOUT:
//       return { ...initialState, loading: false, isAuthenticated: false };
//     case actionTypes.CLEAR_STATE:
//       return { ...initialState, loading: false };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext();

// let onAuthLogoutCallback = null;
// export const setAuthLogoutCallback = (callback) => {
//   onAuthLogoutCallback = callback;
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const router = useRouter();

//   const forceLogout = useCallback(async () => {
//     try {
//       const logoutUrl = API_ROUTES.AUTH_SERVICE.SIGNOUT;
//       if (logoutUrl && logoutUrl.startsWith("http")) {
//         await axiosInstance.post(logoutUrl);
//         console.log("Backend logout successful via forceLogout.");
//       }
//     } catch (err) {
//       console.error("Backend logout failed during forceLogout:", err.message);
//     } finally {
//       dispatch({ type: actionTypes.LOGOUT });
//       router.push("/");
//     }
//   }, [router]);

//   useEffect(() => {
//     setAuthLogoutCallback(forceLogout);
//     return () => setAuthLogoutCallback(null);
//   }, [forceLogout]);

//   useEffect(() => {
//     const checkAuth = async () => {
//       dispatch({ type: actionTypes.LOADING, payload: true });
//       try {
//         const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE, {
//           headers: { "X-Skip-Refresh": "true" }, // Skip token refresh for initial check
//         });
//         if (response.data.success) {
//           dispatch({ type: actionTypes.AUTHENTICATED, payload: response.data.data });
//         } else {
//           dispatch({ type: actionTypes.LOGOUT });
//         }
//       } catch (error) {
//         console.error("Initial auth check failed:", error.message);
//         dispatch({ type: actionTypes.LOGOUT });
//       } finally {
//         dispatch({ type: actionTypes.LOADING, payload: false });
//       }
//     };

//     checkAuth();
//   }, []);

//   const signin = useCallback(async (identifier, password) => {
//     dispatch({ type: actionTypes.LOADING, payload: true });
//     try {
//       const response = await axiosInstance.post(API_ROUTES.AUTH_SERVICE.SIGNIN, {
//         identifier,
//         password,
//       });

//       if (response.data.success) {
//         const userData = response.data.data;
//         dispatch({ type: actionTypes.AUTHENTICATED, payload: userData });
//         dispatch({
//           type: actionTypes.SUCCESS,
//           payload: response.data.message || "Login successful",
//         });
//         return { status: 200, message: response.data.message };
//       } else {
//         throw new Error(response.data.message || "Login failed");
//       }
//     } catch (error) {
//       let errorMessage = "Login failed. Please try again.";
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
//       console.error("Signin error:", errorMessage);
//       dispatch({ type: actionTypes.ERROR, payload: errorMessage });
//       return { status: error.response?.status || 400, message: errorMessage };
//     } finally {
//       dispatch({ type: actionTypes.LOADING, payload: false });
//     }
//   }, []);

//   const followUser = useCallback(async (followerId, followingId) => {
//     try {
//       const response = await axiosInstance.post(API_ROUTES.FOLLOW_SERVICE.FOLLOW, {
//         followerId,
//         followingId,
//       });
//       if (response.data.success) {
//         console.log("Follow successful:", response.data.message);
//         return { status: 201, message: "Followed successfully" };
//       } else {
//         return { status: response.data.statuscode, message: response.data.message };
//       }
//     } catch (error) {
//       let errorMessage = "Could not follow user.";
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
//       console.error("Follow error:", errorMessage);
//       return { status: error.response?.status || 500, message: errorMessage };
//     }
//   }, []);

//   const logout = useCallback(async () => {
//     forceLogout();
//   }, [forceLogout]);

//   const clearState = useCallback(() => {
//     dispatch({ type: actionTypes.CLEAR_STATE });
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         state,
//         signin,
//         logout,
//         clearState,
//         forceLogout,
//         followUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export { onAuthLogoutCallback };
"use client";

import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/config";
import axiosInstance from "@/utils/auth/axiosInstance";

// Initial State for the authentication context
const initialState = {
  loading: false, // Start with loading false to keep form interactive
  error: null,
  isAuthenticated: false,
  user: null,
  success: null,
};

// Action types
const actionTypes = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  AUTHENTICATED: "AUTHENTICATED",
  LOGOUT: "LOGOUT",
  CLEAR_STATE: "CLEAR_STATE",
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: action.payload, error: null, success: null };
    case actionTypes.ERROR:
      return { ...state, loading: false, error: action.payload, success: null };
    case actionTypes.SUCCESS:
      return { ...state, loading: false, success: action.payload, error: null };
    case actionTypes.AUTHENTICATED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case actionTypes.LOGOUT:
      return { ...initialState, loading: false, isAuthenticated: false };
    case actionTypes.CLEAR_STATE:
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

const AuthContext = createContext();

let onAuthLogoutCallback = null;
export const setAuthLogoutCallback = (callback) => {
  onAuthLogoutCallback = callback;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  const forceLogout = useCallback(async () => {
    try {
      const logoutUrl = API_ROUTES.AUTH_SERVICE.SIGNOUT;
      if (logoutUrl && logoutUrl.startsWith("http")) {
        await axiosInstance.post(logoutUrl);
        console.log("Backend logout successful via forceLogout.");
      }
    } catch (err) {
      console.error("Backend logout failed during forceLogout:", err.message);
    } finally {
      dispatch({ type: actionTypes.LOGOUT });
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    setAuthLogoutCallback(forceLogout);
    return () => setAuthLogoutCallback(null);
  }, [forceLogout]);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: actionTypes.LOADING, payload: true });
      try {
        const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE, {
          headers: { "X-Skip-Refresh": "true" }, // Skip token refresh for initial check
        });
        if (response.data.success) {
          dispatch({ type: actionTypes.AUTHENTICATED, payload: response.data.data });
        } else {
          dispatch({ type: actionTypes.LOGOUT });
        }
      } catch (error) {
        // Suppress network errors for initial check, as they are expected for unauthenticated users
        if (error.message !== "Network Error") {
          console.error("Initial auth check failed:", error.message);
        }
        dispatch({ type: actionTypes.LOGOUT });
      } finally {
        dispatch({ type: actionTypes.LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  const signin = useCallback(async (identifier, password) => {
    dispatch({ type: actionTypes.LOADING, payload: true });
    try {
      const response = await axiosInstance.post(API_ROUTES.AUTH_SERVICE.SIGNIN, {
        identifier,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data;
        dispatch({ type: actionTypes.AUTHENTICATED, payload: userData });
        dispatch({
          type: actionTypes.SUCCESS,
          payload: response.data.message || "Login successful",
        });
        return { status: 200, message: response.data.message };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      console.error("Signin error:", errorMessage);
      dispatch({ type: actionTypes.ERROR, payload: errorMessage });
      return { status: error.response?.status || 400, message: errorMessage };
    } finally {
      dispatch({ type: actionTypes.LOADING, payload: false });
    }
  }, []);

  const followUser = useCallback(async (followerId, followingId) => {
    try {
      const response = await axiosInstance.post(API_ROUTES.FOLLOW_SERVICE.FOLLOW, {
        followerId,
        followingId,
      });
      if (response.data.success) {
        console.log("Follow successful:", response.data.message);
        return { status: 201, message: "Followed successfully" };
      } else {
        return { status: response.data.statuscode, message: response.data.message };
      }
    } catch (error) {
      let errorMessage = "Could not follow user.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      console.error("Follow error:", errorMessage);
      return { status: error.response?.status || 500, message: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    forceLogout();
  }, [forceLogout]);

  const clearState = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_STATE });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        signin,
        logout,
        clearState,
        forceLogout,
        followUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { onAuthLogoutCallback };
