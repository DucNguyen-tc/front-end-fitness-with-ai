// src/services/apiClient.js
import axios from "axios";
import { refreshToken, logout } from "./authService";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tự thêm access token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: xử lý khi bị 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // tránh loop vô tận

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest); // gọi lại request cũ
      } catch (err) {
        logout(); // refresh fail thì logout
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;