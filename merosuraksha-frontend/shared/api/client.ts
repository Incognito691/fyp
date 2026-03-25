import axios from "axios";
import { Platform } from "react-native";
import { storage } from "@/shared/utils/storage";

// 🔗 API Base URL - Automatically configured based on platform
// - Web: Uses localhost (your local backend)
// - Native: Uses ngrok URL (accessible from anywhere)
const getApiBaseUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5001/api';
  }
  // For native (iOS/Android), use ngrok URL from environment
  return process.env.EXPO_PUBLIC_API_BASE_URL || 'https://turdine-malisa-aulic.ngrok-free.dev/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 second timeout
});

// Add token to every request automatically
api.interceptors.request.use(async (config) => {
  try {
    const token = await storage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("❌ Token retrieval error:", error);
  }
  return config;
});

// Optional: Response interceptor for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // More detailed error logging
    if (error.code === 'ECONNABORTED') {
      console.error("❌ Request timeout - backend may be down or unreachable");
    } else if (error.code === 'ERR_NETWORK') {
      console.error("❌ Network error - cannot reach backend at:", API_BASE_URL);
    } else if (!error.response) {
      console.error("❌ No response from server - backend may be down");
    }
    
    console.error("❌ API Error:", {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message,
      data: error.response?.data,
      code: error.code,
    });
    
    return Promise.reject(error);
  }
);

export default api;