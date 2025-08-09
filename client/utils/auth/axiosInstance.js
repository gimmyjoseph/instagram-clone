
// import axios from "axios";
// import { API_ROUTES } from "@/config";

// // Create an Axios instance with default options
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // CHANGED: Use environment variable for backend URL[](http://localhost:8080)
//   withCredentials: true, // Ensure HTTP-only cookies are sent
// });

// // Variables to manage refresh state
// let isRefreshing = false;
// let failedQueue = [];

// /**
//  * Processes the queue of failed requests.
//  */
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

// /**
//  * Response interceptor to handle 401 errors by refreshing the token.
//  */
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 errors and prevent infinite retry loops
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         // Queue the request if a refresh is in progress
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => axiosInstance(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         // CHANGED: Use POST for refresh-token endpoint, no Authorization header needed
//         await axiosInstance.post(API_ROUTES.AUTH_SERVICE.REFRESH_TOKEN);
//         processQueue(null);
//         return axiosInstance(originalRequest); // Retry the original request
//       } catch (refreshError) {
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

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  console.log("Processing queue with error:", error?.message || "None");
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Request succeeded: ${response.config.url}, Status: ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("401 error detected for:", originalRequest.url, "Headers:", originalRequest.headers);

      if (isRefreshing) {
        console.log("Token refresh in progress, queuing request:", originalRequest.url);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            console.log("Retrying original request:", originalRequest.url);
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.error("Queued request failed:", err.message);
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        console.log("Refreshing token via:", API_ROUTES.AUTH_SERVICE.REFRESH_TOKEN);
        const response = await axiosInstance.post(API_ROUTES.AUTH_SERVICE.REFRESH_TOKEN);
        console.log("Token refresh response:", JSON.stringify(response.data, null, 2));
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.response?.data?.message || refreshError.message);
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error("Request failed:", error.response?.data?.message || error.message, "URL:", originalRequest.url, "Status:", error.response?.status);
    return Promise.reject(error);
  }
);

export default axiosInstance;