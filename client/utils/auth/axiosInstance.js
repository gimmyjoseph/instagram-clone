
// import axios from "axios";
// import { API_ROUTES } from "@/config";
// import { onAuthLogoutCallback } from "@/context/AuthContext";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve();
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => {
//           return axiosInstance(originalRequest);
//         }).catch((err) => {
//           return Promise.reject(err);
//         });
//       }

//       isRefreshing = true;

//       try {
//         await axiosInstance.post(
//           API_ROUTES.AUTH_SERVICE.REFRESH_TOKEN
//         );
//         processQueue(null);
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         if (onAuthLogoutCallback) {
//           onAuthLogoutCallback();
//         }
//         processQueue(refreshError);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from "axios";
import { API_ROUTES } from "@/config";
import { onAuthLogoutCallback } from "@/context/AuthContext";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  withCredentials: true, // Ensure cookies are sent with requests
});

let isRefreshing = false;
let failedQueue = [];

// Process queued requests after token refresh
const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request config:", {
      url: config.url,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip retry for signin, refresh, or if refresh already attempted or explicitly skipped
    if (
      originalRequest.url === API_ROUTES.AUTH_SERVICE.SIGNIN ||
      originalRequest.url === API_ROUTES.AUTH_SERVICE.REFRESH ||
      originalRequest._retry ||
      originalRequest.headers["X-Skip-Refresh"]
    ) {
      console.log("Skipping token refresh for:", originalRequest.url);
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      console.log("401 error detected, attempting token refresh");
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            console.log("Retrying original request after refresh");
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.error("Failed to retry original request:", err);
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        await axiosInstance.post(API_ROUTES.AUTH_SERVICE.REFRESH);
        console.log("Token refresh successful");
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.message);
        if (onAuthLogoutCallback) {
          console.log("Triggering logout due to refresh failure");
          onAuthLogoutCallback();
        }
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error("Response error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
