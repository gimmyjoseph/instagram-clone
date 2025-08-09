

// "use client";

// import React, { createContext, useReducer, useContext, useCallback, useState } from "react";
// import axiosInstance from "@/utils/auth/axiosInstance";
// import { API_ROUTES } from "@/config";

// const initialState = {
//   loading: false,
//   error: null,
//   user: null,
// };

// const actionTypes = {
//   LOADING: "LOADING",
//   ERROR: "ERROR",
//   SET_USER_PROFILE: "SET_USER_PROFILE",
//   CLEAR_USER_DATA: "CLEAR_USER_DATA",
// };

// const userReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.LOADING:
//       return { ...state, loading: true, error: null };
//     case actionTypes.ERROR:
//       return { ...state, loading: false, error: action.payload };
//     case actionTypes.SET_USER_PROFILE:
//       return { ...state, loading: false, user: action.payload, error: null };
//     case actionTypes.CLEAR_USER_DATA:
//       return { ...state, user: null, error: null };
//     default:
//       return state;
//   }
// };

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(userReducer, initialState);
//   const [isFetching, setIsFetching] = useState(false);

//   const fetchProfile = useCallback(async () => {
//     if (isFetching || state.user) return;
//     setIsFetching(true);
//     dispatch({ type: actionTypes.LOADING });
//     try {
//       const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
//       const { objectId, email, phoneNumber, userName, fullName, isPhoneVerified, emailVerified, otp } = response.data;
//       // Split fullName into firstName and lastName for frontend
//       const [firstName, ...lastNameParts] = (fullName || "").split(" ");
//       const lastName = lastNameParts.join(" ") || "";
//       const userData = {
//         id: objectId, // Map objectId to id
//         email: email || null, // Email or null if phoneNumber is used
//         phoneNumber: phoneNumber || null, // Phone number or null if email is used
//         userName,
//         fullName, 
//         first_name: firstName, // Derived for frontend
//         last_name: lastName, // Derived for frontend
//         isPhoneVerified: isPhoneVerified || false,
//         emailVerified: emailVerified || false,
//         otp: otp || null,
//         // roles: ["user"], // Default since roles not in DB
//       };
//       dispatch({ type: actionTypes.SET_USER_PROFILE, payload: userData });
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || "Failed to fetch profile";
//       console.error("Fetch profile error:", message);
//       dispatch({ type: actionTypes.ERROR, payload: message });
//     } finally {
//       setIsFetching(false);
//     }
//   }, [isFetching, state.user]);

//   const clearUserData = useCallback(() => {
//     dispatch({ type: actionTypes.CLEAR_USER_DATA });
//   }, []);

//   return (
//     <UserContext.Provider value={{ state, fetchProfile, clearUserData }}>
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

import React, { createContext, useReducer, useContext, useCallback, useState } from "react";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const actionTypes = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SET_USER_PROFILE: "SET_USER_PROFILE",
  CLEAR_USER_DATA: "CLEAR_USER_DATA",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true, error: null };
    case actionTypes.ERROR:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.SET_USER_PROFILE:
      return { ...state, loading: false, user: action.payload, error: null };
    case actionTypes.CLEAR_USER_DATA:
      return { ...state, user: null, error: null };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (isFetching || state.user) return;
    setIsFetching(true);
    dispatch({ type: actionTypes.LOADING });
    try {
      console.log("Fetching profile from:", API_ROUTES.AUTH_SERVICE.PROFILE);
      const response = await axiosInstance.get(API_ROUTES.AUTH_SERVICE.PROFILE);
      console.log("Profile response:", JSON.stringify(response.data, null, 2));

      // Handle error response (e.g., { message: "Invalid or expired token" })
      if (typeof response.data === "string" || (response.data.message && !response.data.user_id)) {
        throw new Error(response.data.message || response.data || "Failed to fetch profile");
      }

      // Extract fields from response.data (JWT claims)
      const {
        user_id,
        id,
        userId,
        username,
        userName,
        user_name,
        name,
        full_name,
        fullName,
        email,
        phone_number,
        phoneNumber,
        phone,
        isPhoneVerified,
        is_phone_verified,
        emailVerified,
        email_verified,
        otp
      } = response.data;

      const userIdFinal = user_id || id || userId;
      const userNameFinal = username || userName || user_name || name || `user_${Date.now()}`;
      const fullNameFinal = full_name || fullName || null;
      const phoneNumberFinal = phone_number || phoneNumber || phone || null;

      if (!userIdFinal) {
        throw new Error("Invalid profile data: missing user ID (user_id/id/userId)");
      }

      if ((email && phoneNumberFinal) || (!email && !phoneNumberFinal)) {
        throw new Error("Invalid profile data: User must have exactly one of email or phoneNumber");
      }

      const [firstName, ...lastNameParts] = (fullNameFinal || "").split(" ");
      const lastName = lastNameParts.join(" ") || "";
      const userData = {
        id: userIdFinal,
        email: email || null,
        phoneNumber: phoneNumberFinal || null,
        userName: userNameFinal,
        fullName: fullNameFinal,
        first_name: firstName,
        last_name: lastName,
        isPhoneVerified: isPhoneVerified || is_phone_verified || false,
        emailVerified: emailVerified || email_verified || false,
        otp: otp || null,
      };
      dispatch({ type: actionTypes.SET_USER_PROFILE, payload: userData });
      console.log("User profile set:", userData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch profile";
      console.error("Fetch profile error:", message, error);
      dispatch({ type: actionTypes.ERROR, payload: message });
      throw error;
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, state.user]);

  const clearUserData = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_USER_DATA });
  }, []);

  return (
    <UserContext.Provider value={{ state, fetchProfile, clearUserData }}>
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