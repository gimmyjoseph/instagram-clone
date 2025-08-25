

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

// const actionTypes = {
//   SET_USER_PROFILE: "SET_USER_PROFILE",
//   CLEAR_PROFILE: "CLEAR_PROFILE",
//   SET_LOADING: "SET_LOADING",
//   SET_ERROR: "SET_ERROR",
// };

// function userReducer(state, action) {
//   switch (action.type) {
//     case actionTypes.SET_USER_PROFILE:
//       return { ...state, user: action.payload, loading: false, error: null };
//     case actionTypes.CLEAR_PROFILE:
//       return { ...initialState, loading: false };
//     case actionTypes.SET_LOADING:
//       return { ...state, loading: action.payload };
//     case actionTypes.SET_ERROR:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(userReducer, initialState);
//   const { state: authState } = useAuth();

//   const fetchProfile = useCallback(async () => {
//     if (!authState.isAuthenticated || !authState.user?.userId) {
//       dispatch({ type: actionTypes.CLEAR_PROFILE });
//       console.log("User not authenticated or userId is missing. Skipping profile fetch.");
//       return;
//     }

//     dispatch({ type: actionTypes.SET_LOADING, payload: true });
//     console.log("Fetching profile for userId:", authState.user.userId);
    
//     try {
//       // 🔑 CHANGE: Use the correct, new API route for the user profile
//       const response = await axiosInstance.get(
//         `${API_ROUTES.AUTH_SERVICE.PROFILE}?userId=${authState.user.userId}`
//       );
//       if (response.data.success) {
//         dispatch({
//           type: actionTypes.SET_USER_PROFILE,
//           payload: response.data.data,
//         });
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

//   useEffect(() => {
//     if (authState.isAuthenticated && authState.user) {
//       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: authState.user });
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
};

function userReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return { ...state, user: action.payload, loading: false, error: null };
    case actionTypes.CLEAR_PROFILE:
      return { ...initialState, loading: false };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
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
      console.log("User not authenticated. Skipping profile fetch.");
      return;
    }

    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    console.log("Fetching profile");
    
    try {
      const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
      if (response.data.success) {
        dispatch({
          type: actionTypes.SET_USER_PROFILE,
          payload: response.data.data,
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
      dispatch({ type: actionTypes.SET_USER_PROFILE, payload: authState.user });
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