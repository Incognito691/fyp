import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 🔗 API Base URL - Choose based on your testing method:
// -------------------------------------------------------
// ✅ Physical Device (Expo Go app) - YOUR IP:
const API_BASE_URL = "http://192.168.1.107:5000/api";

// 📱 Android Emulator (AVD):
// const API_BASE_URL = "http://10.0.2.2:5000/api";

// 🍎 iOS Simulator:
// const API_BASE_URL = "http://localhost:5000/api";

// 🌐 Web Browser:
// const API_BASE_URL = "http://localhost:5000/api";
// -------------------------------------------------------

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 second timeout
});

// Add token to every request automatically
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("token");
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
    // Uncomment for debugging:
    // console.error("❌ API Error:", {
    //   url: error.config?.url,
    //   status: error.response?.status,
    //   message: error.response?.data?.message,
    // });
    
    return Promise.reject(error);
  }
);

export default api;