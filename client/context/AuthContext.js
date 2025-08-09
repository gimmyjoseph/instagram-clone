

// "use client";

// import React, { createContext, useReducer, useContext, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/utils/auth/axiosInstance";
// import { API_ROUTES } from "@/config";

// const initialState = {
//   loading: false,
//   error: null,
//   isAuthenticated: false,
//   user: null,
//   success: null,
// };

// const actionTypes = {
//   LOADING: "LOADING",
//   ERROR: "ERROR",
//   SUCCESS: "SUCCESS",
//   AUTHENTICATED: "AUTHENTICATED",
//   LOGOUT: "LOGOUT",
//   CLEAR_STATE: "CLEAR_STATE",
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.LOADING:
//       return { ...state, loading: true, error: null, success: null };
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
//       return { ...initialState };
//     case actionTypes.CLEAR_STATE:
//       return { ...initialState };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const router = useRouter();

//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//   if (!baseUrl) {
//     console.error("NEXT_PUBLIC_API_BASE_URL is not defined in .env");
//   }

//   const signin = useCallback(async (identifier, password) => {
//     dispatch({ type: actionTypes.LOADING });
//     try {
//       const loginUrl = API_ROUTES.AUTH_SERVICE.SIGNIN;
//       if (!loginUrl || !loginUrl.startsWith("http")) {
//         throw new Error(`Invalid login URL: ${loginUrl}. Ensure NEXT_PUBLIC_API_BASE_URL is set.`);
//       }
//       console.log("Attempting login with URL:", loginUrl);

//       const response = await axiosInstance.post(loginUrl, { identifier, password });
//       console.log("Signin response:", JSON.stringify(response.data, null, 2));

//       if (response.data.success) {
//         const {
//           id,
//           userId,
//           user_id,
//           userName,
//           username,
//           user_name,
//           name,
//           fullName,
//           full_name,
//           email,
//           phoneNumber,
//           phone_number,
//           phone,
//           isPhoneVerified,
//           is_phone_verified,
//           emailVerified,
//           email_verified,
//           otp
//         } = response.data.data;

//         const userIdFinal = id || userId || user_id;
//         const userNameFinal = userName || username || user_name || name || `user_${Date.now()}`;
//         const fullNameFinal = fullName || full_name || null;
//         const phoneNumberFinal = phoneNumber || phone_number || phone || null;

//         if (!userIdFinal) {
//           throw new Error("Invalid user data: missing user ID (id/userId/user_id)");
//         }
//         if ((email && phoneNumberFinal) || (!email && !phoneNumberFinal)) {
//           throw new Error("Invalid user data: User must have exactly one of email or phoneNumber");
//         }

//         const [firstName, ...lastNameParts] = (fullNameFinal || "").split(" ");
//         const lastName = lastNameParts.join(" ") || "";
//         const userData = {
//           id: userIdFinal,
//           email: email || null,
//           phoneNumber: phoneNumberFinal || null,
//           userName: userNameFinal,
//           fullName: fullNameFinal,
//           first_name: firstName,
//           last_name: lastName,
//           isPhoneVerified: isPhoneVerified || is_phone_verified || false,
//           emailVerified: emailVerified || email_verified || false,
//           otp: otp || null,
//           roles: ["user"],
//         };
//         dispatch({
//           type: actionTypes.AUTHENTICATED,
//           payload: userData,
//         });
//         dispatch({
//           type: actionTypes.SUCCESS,
//           payload: response.data.message || "Login successful",
//         });
//         router.push("/dashboard/profile");
//         return {
//           status: 200,
//           message: response.data.message,
//         };
//       } else {
//         throw new Error(response.data.message || "Login failed");
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || "Login failed";
//       console.error("Signin error:", message);
//       dispatch({ type: actionTypes.ERROR, payload: message });
//       return {
//         status: error.response?.status || 400,
//         message,
//       };
//     }
//   }, [router]);

//   const logout = useCallback(async () => {
//     dispatch({ type: actionTypes.LOADING });
//     try {
//       const logoutUrl = API_ROUTES.AUTH_SERVICE.SIGNOUT;
//       if (!logoutUrl || !logoutUrl.startsWith("http")) {
//         throw new Error(`Invalid logout URL: ${logoutUrl}. Ensure NEXT_PUBLIC_API_BASE_URL is set.`);
//       }
//       console.log("Attempting logout with URL:", logoutUrl);

//       await axiosInstance.post(logoutUrl, {});
//       dispatch({ type: actionTypes.LOGOUT });
//       dispatch({ type: actionTypes.CLEAR_STATE });
//       router.push("/");
//     } catch (error) {
//       console.error("Logout error:", error.message);
//       dispatch({ type: actionTypes.LOGOUT });
//       dispatch({ type: actionTypes.CLEAR_STATE });
//       router.push("/");
//     }
//   }, [router]);

//   const clearState = useCallback(() => {
//     dispatch({ type: actionTypes.CLEAR_STATE });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ state, signin, logout, clearState }}>
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

"use client";

import React, { createContext, useReducer, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/auth/axiosInstance";
import { API_ROUTES } from "@/config";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  success: null,
};

const actionTypes = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  AUTHENTICATED: "AUTHENTICATED",
  LOGOUT: "LOGOUT",
  CLEAR_STATE: "CLEAR_STATE",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true, error: null, success: null };
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
      return { ...initialState };
    case actionTypes.CLEAR_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not defined in .env");
  }

  const signin = useCallback(async (identifier, password) => {
    dispatch({ type: actionTypes.LOADING });
    try {
      const loginUrl = API_ROUTES.AUTH_SERVICE.SIGNIN;
      if (!loginUrl || !loginUrl.startsWith("http")) {
        throw new Error(`Invalid login URL: ${loginUrl}. Ensure NEXT_PUBLIC_API_BASE_URL is set.`);
      }
      console.log("Attempting login with URL:", loginUrl);

      const response = await axiosInstance.post(loginUrl, { identifier, password });
      console.log("Signin response:", JSON.stringify(response.data, null, 2));

      if (response.data.success) {
        const { id, userName, fullName, email, phoneNumber } = response.data.data;

        if (!id) {
          throw new Error("Invalid user data: missing user ID (id)");
        }
        if ((email && phoneNumber) || (!email && !phoneNumber)) {
          throw new Error("Invalid user data: User must have exactly one of email or phoneNumber");
        }

        const [firstName, ...lastNameParts] = (fullName || "").split(" ");
        const lastName = lastNameParts.join(" ") || "";
        const userData = {
          id,
          email: email || null,
          phoneNumber: phoneNumber || null,
          userName,
          fullName,
          first_name: firstName,
          last_name: lastName,
          isPhoneVerified: false,
          emailVerified: false,
          otp: null,
          roles: ["user"],
        };
        dispatch({
          type: actionTypes.AUTHENTICATED,
          payload: userData,
        });
        dispatch({
          type: actionTypes.SUCCESS,
          payload: response.data.message || "Login successful",
        });
        router.push("/dashboard/profile");
        return {
          status: 200,
          message: response.data.message,
        };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      console.error("Signin error:", message);
      dispatch({ type: actionTypes.ERROR, payload: message });
      return {
        status: error.response?.status || 400,
        message,
      };
    }
  }, [router]);

  const verifyOtp = useCallback(async (identifier, otp) => {
    dispatch({ type: actionTypes.LOADING });
    try {
      // Determine if identifier is email or phone number
      const isEmail = identifier.includes("@");
      const verifyUrl = isEmail
        ? `${baseUrl}/api/verify/email/otp`
        : `${baseUrl}/api/verify/phone/otp`;
      console.log("Attempting OTP verification with URL:", verifyUrl);

      // Send Register-compatible payload
      const payload = {
        email: isEmail ? identifier : null,
        phoneNumber: !isEmail ? identifier : null,
        otp,
      };
      const response = await axiosInstance.post(verifyUrl, payload);
      console.log("Verify OTP response:", JSON.stringify(response.data, null, 2));

      if (response.data.success) {
        const { id, userName, fullName, email, phoneNumber, isPhoneVerified, emailVerified, otp } =
          response.data.data || {};
        if (!id) {
          throw new Error("Invalid user data: missing user ID (id)");
        }
        const [firstName, ...lastNameParts] = (fullName || "").split(" ");
        const lastName = lastNameParts.join(" ") || "";
        const updatedUser = {
          id,
          email: email || null,
          phoneNumber: phoneNumber || null,
          userName,
          fullName,
          first_name: firstName,
          last_name: lastName,
          isPhoneVerified: isPhoneVerified || false,
          emailVerified: emailVerified || false,
          otp: otp || null,
          roles: state.user?.roles || ["user"],
        };
        dispatch({
          type: actionTypes.AUTHENTICATED,
          payload: updatedUser,
        });
        dispatch({
          type: actionTypes.SUCCESS,
          payload: response.data.message || "OTP verified successfully",
        });
        return {
          status: 200,
          message: response.data.message,
        };
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "OTP verification failed";
      console.error("Verify OTP error:", message);
      dispatch({ type: actionTypes.ERROR, payload: message });
      return {
        status: error.response?.status || 400,
        message,
      };
    }
  }, [state.user]);

  const logout = useCallback(async () => {
    dispatch({ type: actionTypes.LOADING });
    try {
      const logoutUrl = API_ROUTES.AUTH_SERVICE.SIGNOUT;
      if (!logoutUrl || !logoutUrl.startsWith("http")) {
        throw new Error(`Invalid logout URL: ${logoutUrl}. Ensure NEXT_PUBLIC_API_BASE_URL is set.`);
      }
      console.log("Attempting logout with URL:", logoutUrl);

      await axiosInstance.post(logoutUrl, {});
      dispatch({ type: actionTypes.LOGOUT });
      dispatch({ type: actionTypes.CLEAR_STATE });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
      dispatch({ type: actionTypes.LOGOUT });
      dispatch({ type: actionTypes.CLEAR_STATE });
      router.push("/login");
    }
  }, [router]);

  const clearState = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_STATE });
  }, []);

  return (
    <AuthContext.Provider value={{ state, signin, verifyOtp, logout, clearState }}>
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