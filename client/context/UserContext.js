"use client";

import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";

const UserContext = createContext();

const initialState = {
  user: null,
  loading: true,
  error: null,
};

const actionTypes = {
  SET_USER_PROFILE: "SET_USER_PROFILE",
  CLEAR_PROFILE: "CLEAR_PROFILE",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  UPDATE_FOLLOWING_COUNT: "UPDATE_FOLLOWING_COUNT",
  UPDATE_FOLLOWER_COUNT: "UPDATE_FOLLOWER_COUNT",
};

function userReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return { ...state, user: { ...action.payload }, loading: false, error: null };

    case actionTypes.CLEAR_PROFILE:
      return { ...initialState, loading: false };

    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case actionTypes.UPDATE_FOLLOWING_COUNT:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              followingCount: Math.max(
                0,
                Number(state.user.followingCount || 0) + Number(action.payload)
              ),
            }
          : state.user,
      };

    case actionTypes.UPDATE_FOLLOWER_COUNT:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              followerCount: Math.max(
                0,
                Number(state.user.followerCount || 0) + Number(action.payload)
              ),
            }
          : state.user,
      };

    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { state: authState } = useAuth();

  const fetchProfile = useCallback(async () => {
    if (!authState.isAuthenticated) {
      dispatch({ type: actionTypes.CLEAR_PROFILE });
      return;
    }

    dispatch({ type: actionTypes.SET_LOADING, payload: true });

    try {
      const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
      if (response.data.success) {
        dispatch({
          type: actionTypes.SET_USER_PROFILE,
          payload: { ...response.data.data },
        });
      } else {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: response.data.message || "Failed to fetch user profile.",
        });
      }
    } catch (err) {
      const message = err.response?.data?.message || "Error fetching profile.";
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
    }
  }, [authState]);

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      dispatch({
        type: actionTypes.SET_USER_PROFILE,
        payload: { ...authState.user },
      });
      fetchProfile();
    } else {
      dispatch({ type: actionTypes.CLEAR_PROFILE });
    }
  }, [authState, fetchProfile]);

  return (
    <UserContext.Provider
      value={{
        state,
        fetchProfile,
        setUser: (userData) =>
          dispatch({
            type: actionTypes.SET_USER_PROFILE,
            payload: { ...userData },
          }),
        updateFollowingCount: (delta) =>
          dispatch({ type: actionTypes.UPDATE_FOLLOWING_COUNT, payload: delta }),
        updateFollowerCount: (delta) =>
          dispatch({ type: actionTypes.UPDATE_FOLLOWER_COUNT, payload: delta }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// "use client";

// import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import axiosInstance from "@/utils/auth/axiosInstance";
// import { API_ROUTES } from "@/config";

// const UserContext = createContext();

// const initialState = {
//   user: null,
//   loading: true,
//   error: null,
// };

// // ✅ Define all action types
// const actionTypes = {
//   SET_USER_PROFILE: "SET_USER_PROFILE",
//   CLEAR_PROFILE: "CLEAR_PROFILE",
//   SET_LOADING: "SET_LOADING",
//   SET_ERROR: "SET_ERROR",
//   UPDATE_FOLLOWING_COUNT: "UPDATE_FOLLOWING_COUNT",
//   UPDATE_FOLLOWER_COUNT: "UPDATE_FOLLOWER_COUNT",
// };

// function userReducer(state, action) {
//   switch (action.type) {
//     case actionTypes.SET_USER_PROFILE:
//       return { ...state, user: { ...action.payload }, loading: false, error: null };

//     case actionTypes.CLEAR_PROFILE:
//       return { ...initialState, loading: false };

//     case actionTypes.SET_LOADING:
//       return { ...state, loading: action.payload };

//     case actionTypes.SET_ERROR:
//       return { ...state, loading: false, error: action.payload };

//     // ✅ Following count updates (+1 or -1 safely)
//     case actionTypes.UPDATE_FOLLOWING_COUNT:
//       return {
//         ...state,
//         user: state.user
//           ? {
//               ...state.user,
//               followingCount: Math.max(
//                 0,
//                 (state.user.followingCount || 0) + action.payload
//               ),
//             }
//           : state.user,
//       };

//     // ✅ Follower count updates (+1 or -1 safely)
//     case actionTypes.UPDATE_FOLLOWER_COUNT:
//       return {
//         ...state,
//         user: state.user
//           ? {
//               ...state.user,
//               followerCount: Math.max(
//                 0,
//                 (state.user.followerCount || 0) + action.payload
//               ),
//             }
//           : state.user,
//       };

//     default:
//       return state;
//   }
// }

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(userReducer, initialState);
//   const { state: authState } = useAuth();

//   // ✅ Fetch user profile
//   const fetchProfile = useCallback(async () => {
//     if (!authState.isAuthenticated) {
//       dispatch({ type: actionTypes.CLEAR_PROFILE });
//       console.log("User not authenticated. Skipping profile fetch.");
//       return;
//     }

//     dispatch({ type: actionTypes.SET_LOADING, payload: true });
//     console.log("Fetching profile...");

//     try {
//       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
//       if (response.data.success) {
//         dispatch({
//           type: actionTypes.SET_USER_PROFILE,
//           payload: { ...response.data.data },
//         });
//         console.log("✅ Profile refreshed:", response.data.data);
//       } else {
//         dispatch({
//           type: actionTypes.SET_ERROR,
//           payload: response.data.message || "Failed to fetch user profile.",
//         });
//       }
//     } catch (err) {
//       const message = err.response?.data?.message || "Error fetching profile.";
//       dispatch({ type: actionTypes.SET_ERROR, payload: message });
//     }
//   }, [authState]);

//   // ✅ Sync profile when auth changes
//   useEffect(() => {
//     if (authState.isAuthenticated && authState.user) {
//       dispatch({
//         type: actionTypes.SET_USER_PROFILE,
//         payload: { ...authState.user },
//       });
//       fetchProfile();
//     } else {
//       dispatch({ type: actionTypes.CLEAR_PROFILE });
//     }
//   }, [authState, fetchProfile]);

//   return (
//     <UserContext.Provider
//       value={{
//         state,
//         fetchProfile,
//         setUser: (userData) =>
//           dispatch({
//             type: actionTypes.SET_USER_PROFILE,
//             payload: { ...userData },
//           }),

//         // ✅ For Following updates
//         updateFollowingCount: (delta) =>
//           dispatch({ type: actionTypes.UPDATE_FOLLOWING_COUNT, payload: delta }),

//         // ✅ For Follower updates
//         updateFollowerCount: (delta) =>
//           dispatch({ type: actionTypes.UPDATE_FOLLOWER_COUNT, payload: delta }),
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// // // UserContext.js
// // "use client";

// // import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
// // import { useAuth } from "@/context/AuthContext";
// // import axiosInstance from "@/utils/auth/axiosInstance";
// // import { API_ROUTES } from "@/config";

// // const UserContext = createContext();

// // const initialState = {
// //   user: null,
// //   loading: true,
// //   error: null,
// // };

// // // Add a new action type for follower count updates
// // const actionTypes = {
// //   SET_USER_PROFILE: "SET_USER_PROFILE",
// //   CLEAR_PROFILE: "CLEAR_PROFILE",
// //   SET_LOADING: "SET_LOADING",
// //   SET_ERROR: "SET_ERROR",
// //   UPDATE_FOLLOWING_COUNT: "UPDATE_FOLLOWING_COUNT",
// //   UPDATE_FOLLOWER_COUNT: "UPDATE_FOLLOWER_COUNT", // ✅ New action type
// // };

// // function userReducer(state, action) {
// //   switch (action.type) {
// //     case actionTypes.SET_USER_PROFILE:
// //       return { ...state, user: { ...action.payload }, loading: false, error: null };
// //     case actionTypes.CLEAR_PROFILE:
// //       return { ...initialState, loading: false };
// //     case actionTypes.SET_LOADING:
// //       return { ...state, loading: action.payload };
// //     case actionTypes.SET_ERROR:
// //       return { ...state, loading: false, error: action.payload };
// //     case actionTypes.UPDATE_FOLLOWING_COUNT:
// //       return {
// //         ...state,
// //         user: state.user
// //           ? { ...state.user, followingCount: state.user.followingCount + action.payload }
// //           : state.user,
// //       };
// //     // ✅ Add a new case to handle follower count updates
// //     case actionTypes.UPDATE_FOLLOWER_COUNT:
// //       return {
// //         ...state,
// //         user: state.user
// //           ? { ...state.user, followerCount: state.user.followerCount + action.payload }
// //           : state.user,
// //       };
// //     default:
// //       return state;
// //   }
// // }

// // export const UserProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(userReducer, initialState);
// //   const { state: authState } = useAuth();

// //   const fetchProfile = useCallback(async () => {
// //     if (!authState.isAuthenticated) {
// //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// //       console.log("User not authenticated. Skipping profile fetch.");
// //       return;
// //     }

// //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// //     console.log("Fetching profile...");

// //     try {
// //       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
// //       if (response.data.success) {
// //         dispatch({
// //           type: actionTypes.SET_USER_PROFILE,
// //           payload: { ...response.data.data },
// //         });
// //         console.log("✅ Profile refreshed:", response.data.data);
// //       } else {
// //         dispatch({
// //           type: actionTypes.SET_ERROR,
// //           payload: response.data.message || "Failed to fetch user profile.",
// //         });
// //       }
// //     } catch (err) {
// //       const message = err.response?.data?.message || "Error fetching profile.";
// //       dispatch({ type: actionTypes.SET_ERROR, payload: message });
// //     }
// //   }, [authState]);

// //   useEffect(() => {
// //     if (authState.isAuthenticated && authState.user) {
// //       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: { ...authState.user } });
// //       fetchProfile();
// //     } else {
// //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// //     }
// //   }, [authState, fetchProfile]);

// //   return (
// //     <UserContext.Provider
// //       value={{
// //         state,
// //         fetchProfile,
// //         setUser: (userData) =>
// //           dispatch({ type: actionTypes.SET_USER_PROFILE, payload: { ...userData } }),
// //         updateFollowingCount: (delta) =>
// //           dispatch({ type: actionTypes.UPDATE_FOLLOWING_COUNT, payload: delta }),
// //         // ✅ Expose the new function for updating the follower count
// //         updateFollowerCount: (delta) =>
// //           dispatch({ type: actionTypes.UPDATE_FOLLOWER_COUNT, payload: delta }),
// //       }}
// //     >
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const useUser = () => {
// //   const context = useContext(UserContext);
// //   if (!context) {
// //     throw new Error("useUser must be used within a UserProvider");
// //   }
// //   return context;
// // };
// // // "use client";

// // // import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
// // // import { useAuth } from "@/context/AuthContext";
// // // import axiosInstance from "@/utils/auth/axiosInstance";
// // // import { API_ROUTES } from "@/config";

// // // const UserContext = createContext();

// // // const initialState = {
// // //   user: null,
// // //   loading: true,
// // //   error: null,
// // // };

// // // const actionTypes = {
// // //   SET_USER_PROFILE: "SET_USER_PROFILE",
// // //   CLEAR_PROFILE: "CLEAR_PROFILE",
// // //   SET_LOADING: "SET_LOADING",
// // //   SET_ERROR: "SET_ERROR",
// // //   UPDATE_FOLLOWING_COUNT: "UPDATE_FOLLOWING_COUNT",
// // // };

// // // function userReducer(state, action) {
// // //   switch (action.type) {
// // //     case actionTypes.SET_USER_PROFILE:
// // //       return { ...state, user: { ...action.payload }, loading: false, error: null }; // 🔥 new object reference
// // //     case actionTypes.CLEAR_PROFILE:
// // //       return { ...initialState, loading: false };
// // //     case actionTypes.SET_LOADING:
// // //       return { ...state, loading: action.payload };
// // //     case actionTypes.SET_ERROR:
// // //       return { ...state, loading: false, error: action.payload };
// // //     case actionTypes.UPDATE_FOLLOWING_COUNT:
// // //       return {
// // //         ...state,
// // //         user: state.user
// // //           ? { ...state.user, followingCount: state.user.followingCount + action.payload }
// // //           : state.user,
// // //       };
// // //     default:
// // //       return state;
// // //   }
// // // }

// // // export const UserProvider = ({ children }) => {
// // //   const [state, dispatch] = useReducer(userReducer, initialState);
// // //   const { state: authState } = useAuth();

// // //   const fetchProfile = useCallback(async () => {
// // //     if (!authState.isAuthenticated) {
// // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // //       console.log("User not authenticated. Skipping profile fetch.");
// // //       return;
// // //     }

// // //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// // //     console.log("Fetching profile...");

// // //     try {
// // //       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
// // //       if (response.data.success) {
// // //         dispatch({
// // //           type: actionTypes.SET_USER_PROFILE,
// // //           payload: { ...response.data.data }, // 🔥 always new object
// // //         });
// // //         console.log("✅ Profile refreshed:", response.data.data);
// // //       } else {
// // //         dispatch({
// // //           type: actionTypes.SET_ERROR,
// // //           payload: response.data.message || "Failed to fetch user profile.",
// // //         });
// // //       }
// // //     } catch (err) {
// // //       const message = err.response?.data?.message || "Error fetching profile.";
// // //       dispatch({ type: actionTypes.SET_ERROR, payload: message });
// // //     }
// // //   }, [authState]);

// // //   useEffect(() => {
// // //     if (authState.isAuthenticated && authState.user) {
// // //       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: { ...authState.user } });
// // //       fetchProfile();
// // //     } else {
// // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // //     }
// // //   }, [authState, fetchProfile]);

// // //   return (
// // //     <UserContext.Provider
// // //       value={{
// // //         state,
// // //         fetchProfile,
// // //         setUser: (userData) =>
// // //           dispatch({ type: actionTypes.SET_USER_PROFILE, payload: { ...userData } }),
// // //         updateFollowingCount: (delta) =>
// // //           dispatch({ type: actionTypes.UPDATE_FOLLOWING_COUNT, payload: delta }), // +1 follow, -1 unfollow
// // //       }}
// // //     >
// // //       {children}
// // //     </UserContext.Provider>
// // //   );
// // // };

// // // export const useUser = () => {
// // //   const context = useContext(UserContext);
// // //   if (!context) {
// // //     throw new Error("useUser must be used within a UserProvider");
// // //   }
// // //   return context;
// // // };

// // // // "use client";

// // // // import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
// // // // import { useAuth } from "@/context/AuthContext";
// // // // import axiosInstance from "@/utils/auth/axiosInstance";
// // // // import { API_ROUTES } from "@/config";

// // // // const UserContext = createContext();

// // // // const initialState = {
// // // //   user: null,
// // // //   loading: true,
// // // //   error: null,
// // // // };

// // // // const actionTypes = {
// // // //   SET_USER_PROFILE: "SET_USER_PROFILE",
// // // //   CLEAR_PROFILE: "CLEAR_PROFILE",
// // // //   SET_LOADING: "SET_LOADING",
// // // //   SET_ERROR: "SET_ERROR",
// // // // };

// // // // function userReducer(state, action) {
// // // //   switch (action.type) {
// // // //     case actionTypes.SET_USER_PROFILE:
// // // //       return { ...state, user: action.payload, loading: false, error: null };
// // // //     case actionTypes.CLEAR_PROFILE:
// // // //       return { ...initialState, loading: false };
// // // //     case actionTypes.SET_LOADING:
// // // //       return { ...state, loading: action.payload };
// // // //     case actionTypes.SET_ERROR:
// // // //       return { ...state, loading: false, error: action.payload };
// // // //     default:
// // // //       return state;
// // // //   }
// // // // }

// // // // export const UserProvider = ({ children }) => {
// // // //   const [state, dispatch] = useReducer(userReducer, initialState);
// // // //   const { state: authState } = useAuth();

// // // //   const fetchProfile = useCallback(async () => {
// // // //     if (!authState.isAuthenticated) {
// // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // //       console.log("User not authenticated. Skipping profile fetch.");
// // // //       return;
// // // //     }

// // // //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// // // //     console.log("Fetching profile...");

// // // //     try {
// // // //       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
// // // //       if (response.data.success) {
// // // //         dispatch({
// // // //           type: actionTypes.SET_USER_PROFILE,
// // // //           payload: response.data.data,
// // // //         });
// // // //         console.log("Profile refreshed:", response.data.data);
// // // //       } else {
// // // //         dispatch({
// // // //           type: actionTypes.SET_ERROR,
// // // //           payload: response.data.message || "Failed to fetch user profile.",
// // // //         });
// // // //       }
// // // //     } catch (err) {
// // // //       const message = err.response?.data?.message || "Error fetching profile.";
// // // //       dispatch({ type: actionTypes.SET_ERROR, payload: message });
// // // //     }
// // // //   }, [authState]);

// // // //   useEffect(() => {
// // // //     if (authState.isAuthenticated && authState.user) {
// // // //       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: authState.user });
// // // //       fetchProfile();
// // // //     } else {
// // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // //     }
// // // //   }, [authState, fetchProfile]);

// // // //   return (
// // // //     <UserContext.Provider
// // // //       value={{
// // // //         state,
// // // //         fetchProfile,
// // // //         setUser: (userData) =>
// // // //           dispatch({ type: actionTypes.SET_USER_PROFILE, payload: userData }),
// // // //       }}
// // // //     >
// // // //       {children}
// // // //     </UserContext.Provider>
// // // //   );
// // // // };

// // // // export const useUser = () => {
// // // //   const context = useContext(UserContext);
// // // //   if (!context) {
// // // //     throw new Error("useUser must be used within a UserProvider");
// // // //   }
// // // //   return context;
// // // // };

// // // // // "use client";

// // // // // import React, {
// // // // //   createContext,
// // // // //   useReducer,
// // // // //   useContext,
// // // // //   useCallback,
// // // // //   useEffect,
// // // // // } from "react";
// // // // // import { useAuth } from "@/context/AuthContext";
// // // // // import axiosInstance from "@/utils/auth/axiosInstance";
// // // // // import { API_ROUTES } from "@/config";

// // // // // const UserContext = createContext();

// // // // // const initialState = {
// // // // //   user: null,
// // // // //   loading: true,
// // // // //   error: null,
// // // // // };

// // // // // const actionTypes = {
// // // // //   SET_USER_PROFILE: "SET_USER_PROFILE",
// // // // //   CLEAR_PROFILE: "CLEAR_PROFILE",
// // // // //   SET_LOADING: "SET_LOADING",
// // // // //   SET_ERROR: "SET_ERROR",
// // // // // };

// // // // // function userReducer(state, action) {
// // // // //   switch (action.type) {
// // // // //     case actionTypes.SET_USER_PROFILE:
// // // // //       return { ...state, user: action.payload, loading: false, error: null };
// // // // //     case actionTypes.CLEAR_PROFILE:
// // // // //       return { ...initialState, loading: false };
// // // // //     case actionTypes.SET_LOADING:
// // // // //       return { ...state, loading: action.payload };
// // // // //     case actionTypes.SET_ERROR:
// // // // //       return { ...state, loading: false, error: action.payload };
// // // // //     default:
// // // // //       return state;
// // // // //   }
// // // // // }

// // // // // export const UserProvider = ({ children }) => {
// // // // //   const [state, dispatch] = useReducer(userReducer, initialState);
// // // // //   const { state: authState } = useAuth();

// // // // //   const fetchProfile = useCallback(async () => {
// // // // //     if (!authState.isAuthenticated) {
// // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // //       console.log("User not authenticated. Skipping profile fetch.");
// // // // //       return;
// // // // //     }

// // // // //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// // // // //     console.log("Fetching profile...");

// // // // //     try {
// // // // //       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
// // // // //       if (response.data.success) {
// // // // //         dispatch({
// // // // //           type: actionTypes.SET_USER_PROFILE,
// // // // //           payload: response.data.data, // ✅ Always use backend latest
// // // // //         });
// // // // //       } else {
// // // // //         dispatch({
// // // // //           type: actionTypes.SET_ERROR,
// // // // //           payload:
// // // // //             response.data.message || "Failed to fetch user profile.",
// // // // //         });
// // // // //       }
// // // // //     } catch (err) {
// // // // //       const message =
// // // // //         err.response?.data?.message || "Error fetching profile.";
// // // // //       dispatch({ type: actionTypes.SET_ERROR, payload: message });
// // // // //     }
// // // // //   }, [authState]);

// // // // //   useEffect(() => {
// // // // //     if (authState.isAuthenticated) {
// // // // //       fetchProfile(); // ✅ Only fetch from backend, no stale overwrite
// // // // //     } else {
// // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // //     }
// // // // //   }, [authState.isAuthenticated, fetchProfile]);

// // // // //   return (
// // // // //     <UserContext.Provider
// // // // //       value={{
// // // // //         state,
// // // // //         fetchProfile,
// // // // //       }}
// // // // //     >
// // // // //       {children}
// // // // //     </UserContext.Provider>
// // // // //   );
// // // // // };

// // // // // export const useUser = () => {
// // // // //   const context = useContext(UserContext);
// // // // //   if (!context) {
// // // // //     throw new Error("useUser must be used within a UserProvider");
// // // // //   }
// // // // //   return context;
// // // // // };

// // // // // // "use client";

// // // // // // import React, { createContext, useReducer, useContext, useCallback, useEffect } from "react";
// // // // // // import { useAuth } from "@/context/AuthContext";
// // // // // // import axiosInstance from "@/utils/auth/axiosInstance";
// // // // // // import { API_ROUTES } from "@/config";

// // // // // // const UserContext = createContext();

// // // // // // const initialState = {
// // // // // //   user: null,
// // // // // //   loading: true,
// // // // // //   error: null,
// // // // // // };

// // // // // // const actionTypes = {
// // // // // //   SET_USER_PROFILE: "SET_USER_PROFILE",
// // // // // //   CLEAR_PROFILE: "CLEAR_PROFILE",
// // // // // //   SET_LOADING: "SET_LOADING",
// // // // // //   SET_ERROR: "SET_ERROR",
// // // // // // };

// // // // // // function userReducer(state, action) {
// // // // // //   switch (action.type) {
// // // // // //     case actionTypes.SET_USER_PROFILE:
// // // // // //       return { ...state, user: action.payload, loading: false, error: null };
// // // // // //     case actionTypes.CLEAR_PROFILE:
// // // // // //       return { ...initialState, loading: false };
// // // // // //     case actionTypes.SET_LOADING:
// // // // // //       return { ...state, loading: action.payload };
// // // // // //     case actionTypes.SET_ERROR:
// // // // // //       return { ...state, loading: false, error: action.payload };
// // // // // //     default:
// // // // // //       return state;
// // // // // //   }
// // // // // // }

// // // // // // export const UserProvider = ({ children }) => {
// // // // // //   const [state, dispatch] = useReducer(userReducer, initialState);
// // // // // //   const { state: authState } = useAuth();

// // // // // //   const fetchProfile = useCallback(async () => {
// // // // // //     if (!authState.isAuthenticated) {
// // // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // // //       console.log("User not authenticated. Skipping profile fetch.");
// // // // // //       return;
// // // // // //     }

// // // // // //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// // // // // //     console.log("Fetching profile");
    
// // // // // //     try {
// // // // // //       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
// // // // // //       if (response.data.success) {
// // // // // //         dispatch({
// // // // // //           type: actionTypes.SET_USER_PROFILE,
// // // // // //           payload: response.data.data,
// // // // // //         });
// // // // // //       } else {
// // // // // //         dispatch({
// // // // // //           type: actionTypes.SET_ERROR,
// // // // // //           payload: response.data.message || "Failed to fetch user profile.",
// // // // // //         });
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       const message = err.response?.data?.message || "Error fetching profile.";
// // // // // //       dispatch({ type: actionTypes.SET_ERROR, payload: message });
// // // // // //     }
// // // // // //   }, [authState]);

// // // // // //   useEffect(() => {
// // // // // //     if (authState.isAuthenticated && authState.user) {
// // // // // //       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: authState.user });
// // // // // //       fetchProfile();
// // // // // //     } else {
// // // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // // //     }
// // // // // //   }, [authState, fetchProfile]);

// // // // // //   return (
// // // // // //     <UserContext.Provider
// // // // // //       value={{
// // // // // //         state,
// // // // // //         fetchProfile,
// // // // // //       }}
// // // // // //     >
// // // // // //       {children}
// // // // // //     </UserContext.Provider>
// // // // // //   );
// // // // // // };

// // // // // // export const useUser = () => {
// // // // // //   const context = useContext(UserContext);
// // // // // //   if (!context) {
// // // // // //     throw new Error("useUser must be used within a UserProvider");
// // // // // //   }
// // // // // //   return context;
// // // // // // };
// // // // // // // // "use client";

// // // // // // // // import React, {
// // // // // // // //   createContext,
// // // // // // // //   useReducer,
// // // // // // // //   useContext,
// // // // // // // //   useCallback,
// // // // // // // //   useEffect,
// // // // // // // // } from "react";
// // // // // // // // import { useAuth } from "@/context/AuthContext"; // 👈 use updated AuthContext
// // // // // // // // import axiosInstance from "@/utils/auth/axiosInstance";
// // // // // // // // import { API_ROUTES } from "@/config";

// // // // // // // // // Create Context
// // // // // // // // const UserContext = createContext();

// // // // // // // // // Initial State
// // // // // // // // const initialState = {
// // // // // // // //   user: null,
// // // // // // // //   loading: true,
// // // // // // // //   error: null,
// // // // // // // // };

// // // // // // // // // Action Types
// // // // // // // // const actionTypes = {
// // // // // // // //   SET_USER_PROFILE: "SET_USER_PROFILE",
// // // // // // // //   CLEAR_PROFILE: "CLEAR_PROFILE",
// // // // // // // //   SET_LOADING: "SET_LOADING",
// // // // // // // //   SET_ERROR: "SET_ERROR",
// // // // // // // // };

// // // // // // // // // Reducer
// // // // // // // // function userReducer(state, action) {
// // // // // // // //   switch (action.type) {
// // // // // // // //     case actionTypes.SET_USER_PROFILE:
// // // // // // // //       return { ...state, user: action.payload, loading: false, error: null };
// // // // // // // //     case actionTypes.CLEAR_PROFILE:
// // // // // // // //       return { ...initialState, loading: false };
// // // // // // // //     case actionTypes.SET_LOADING:
// // // // // // // //       return { ...state, loading: action.payload };
// // // // // // // //     case actionTypes.SET_ERROR:
// // // // // // // //       return { ...state, loading: false, error: action.payload };
// // // // // // // //     default:
// // // // // // // //       return state;
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Provider
// // // // // // // // export const UserProvider = ({ children }) => {
// // // // // // // //   const [state, dispatch] = useReducer(userReducer, initialState);
// // // // // // // //   const { state: authState } = useAuth(); // 👈 from AuthContext

// // // // // // // //   // 🔹 Fetch fresh profile from backend
// // // // // // // //   const fetchProfile = useCallback(async () => {
// // // // // // // //     if (!authState.user) {
// // // // // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // // // // //       console.log("⏭ No authenticated user. Skipping profile fetch.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// // // // // // // //     console.log("🔄 Fetching user profile...");

// // // // // // // //     try {
// // // // // // // //       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
// // // // // // // //       if (response.data.success) {
// // // // // // // //         dispatch({
// // // // // // // //           type: actionTypes.SET_USER_PROFILE,
// // // // // // // //           payload: response.data.data,
// // // // // // // //         });
// // // // // // // //       } else {
// // // // // // // //         dispatch({
// // // // // // // //           type: actionTypes.SET_ERROR,
// // // // // // // //           payload: response.data.message || "Failed to fetch user profile.",
// // // // // // // //         });
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       const message = err.response?.data?.message || "Error fetching profile.";
// // // // // // // //       dispatch({ type: actionTypes.SET_ERROR, payload: message });
// // // // // // // //     }
// // // // // // // //   }, [authState.user]);

// // // // // // // //   // 🔹 Sync with AuthContext
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (authState.user) {
// // // // // // // //       // AuthContext already has basic user info → set immediately
// // // // // // // //       dispatch({
// // // // // // // //         type: actionTypes.SET_USER_PROFILE,
// // // // // // // //         payload: authState.user,
// // // // // // // //       });
// // // // // // // //       // Then fetch full profile from backend
// // // // // // // //       fetchProfile();
// // // // // // // //     } else {
// // // // // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // // // // //     }
// // // // // // // //   }, [authState.user]); // ✅ no need to depend on fetchProfile

// // // // // // // //   return (
// // // // // // // //     <UserContext.Provider
// // // // // // // //       value={{
// // // // // // // //         user: state.user,
// // // // // // // //         loading: state.loading,
// // // // // // // //         error: state.error,
// // // // // // // //         fetchProfile,
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       {children}
// // // // // // // //     </UserContext.Provider>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // // Hook
// // // // // // // // export const useUser = () => {
// // // // // // // //   const context = useContext(UserContext);
// // // // // // // //   if (!context) throw new Error("useUser must be used within a UserProvider");
// // // // // // // //   return context;
// // // // // // // // };
// // // // // // // "use client";

// // // // // // // import React, {
// // // // // // //   createContext,
// // // // // // //   useReducer,
// // // // // // //   useContext,
// // // // // // //   useCallback,
// // // // // // //   useEffect,
// // // // // // // } from "react";
// // // // // // // import { useAuth } from "@/context/AuthContext";
// // // // // // // import axiosInstance from "@/utils/auth/axiosInstance";
// // // // // // // import { API_ROUTES } from "@/config";

// // // // // // // // Context
// // // // // // // const UserContext = createContext();

// // // // // // // // Initial State
// // // // // // // const initialState = {
// // // // // // //   user: null,
// // // // // // //   loading: false,
// // // // // // //   error: null,
// // // // // // // };

// // // // // // // // Action Types
// // // // // // // const actionTypes = {
// // // // // // //   SET_USER_PROFILE: "SET_USER_PROFILE",
// // // // // // //   CLEAR_PROFILE: "CLEAR_PROFILE",
// // // // // // //   SET_LOADING: "SET_LOADING",
// // // // // // //   SET_ERROR: "SET_ERROR",
// // // // // // // };

// // // // // // // // Reducer
// // // // // // // const userReducer = (state, action) => {
// // // // // // //   switch (action.type) {
// // // // // // //     case actionTypes.SET_USER_PROFILE:
// // // // // // //       return { ...state, user: action.payload, loading: false, error: null };
// // // // // // //     case actionTypes.CLEAR_PROFILE:
// // // // // // //       return { ...initialState };
// // // // // // //     case actionTypes.SET_LOADING:
// // // // // // //       return { ...state, loading: action.payload };
// // // // // // //     case actionTypes.SET_ERROR:
// // // // // // //       return { ...state, loading: false, error: action.payload };
// // // // // // //     default:
// // // // // // //       return state;
// // // // // // //   }
// // // // // // // };

// // // // // // // // Helper: normalize profile
// // // // // // // const normalizeUser = (profile) => ({
// // // // // // //   userId: profile.userId || profile.id || profile._id,
// // // // // // //   userName: profile.userName || profile.username,
// // // // // // //   email: profile.email,
// // // // // // //   followerCount: profile.followerCount ?? 0,
// // // // // // //   followingCount: profile.followingCount ?? 0,
// // // // // // //   postCount: profile.postCount ?? 0,
// // // // // // // });

// // // // // // // // Provider
// // // // // // // export const UserProvider = ({ children }) => {
// // // // // // //   const [state, dispatch] = useReducer(userReducer, initialState);
// // // // // // //   const { state: authState } = useAuth();

// // // // // // //   // Fetch profile from backend
// // // // // // //   const fetchProfile = useCallback(async () => {
// // // // // // //     dispatch({ type: actionTypes.SET_LOADING, payload: true });
// // // // // // //     try {
// // // // // // //       const response = await axiosInstance.get(
// // // // // // //         API_ROUTES.AUTH_SERVICE.PROFILE
// // // // // // //       );
// // // // // // //       if (response.data.success) {
// // // // // // //         const normalized = normalizeUser(response.data.data);
// // // // // // //         dispatch({ type: actionTypes.SET_USER_PROFILE, payload: normalized });
// // // // // // //       } else {
// // // // // // //         dispatch({
// // // // // // //           type: actionTypes.SET_ERROR,
// // // // // // //           payload: response.data.message || "Failed to fetch user profile.",
// // // // // // //         });
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       const message = err.response?.data?.message || "Error fetching profile.";
// // // // // // //       if (message.includes("token") && message.includes("expired")) {
// // // // // // //         dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // // // //       } else {
// // // // // // //         dispatch({ type: actionTypes.SET_ERROR, payload: message });
// // // // // // //       }
// // // // // // //     } finally {
// // // // // // //       dispatch({ type: actionTypes.SET_LOADING, payload: false });
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // Effect 1: Sync auth.user into context
// // // // // // //   useEffect(() => {
// // // // // // //     if (authState.isAuthenticated && authState.user) {
// // // // // // //       const normalized = normalizeUser(authState.user);
// // // // // // //       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: normalized });
// // // // // // //     } else {
// // // // // // //       dispatch({ type: actionTypes.CLEAR_PROFILE });
// // // // // // //     }
// // // // // // //   }, [authState.isAuthenticated, authState.user]);

// // // // // // //   // Effect 2: Fetch profile only once when authenticated
// // // // // // //   useEffect(() => {
// // // // // // //     if (authState.isAuthenticated) {
// // // // // // //       fetchProfile();
// // // // // // //     }
// // // // // // //   }, [authState.isAuthenticated, fetchProfile]);

// // // // // // //   return (
// // // // // // //     <UserContext.Provider value={{ state, fetchProfile }}>
// // // // // // //       {children}
// // // // // // //     </UserContext.Provider>
// // // // // // //   );
// // // // // // // };

// // // // // // // // Hook
// // // // // // // export const useUser = () => {
// // // // // // //   const context = useContext(UserContext);
// // // // // // //   if (!context) throw new Error("useUser must be used within a UserProvider");
// // // // // // //   return context;
// // // // // // // };
