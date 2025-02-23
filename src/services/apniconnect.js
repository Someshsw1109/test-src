
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://0.0.0.0:5000/api/v1";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const apiConnector = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    console.log("API call initiated:", method, url);
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers: {
        ...axiosInstance.defaults.headers,
        ...headers,
      },
      params,
    });
    return response;
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    throw error;
  }
};

export { axiosInstance, apiConnector };
