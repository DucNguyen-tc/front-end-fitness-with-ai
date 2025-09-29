import apiClient from "./apiClient";
import axios from "axios";

const BASE_URL = "http://localhost:3000/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });

  // backend trả về accessToken + refreshToken
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response.data;
};

export const register = async (name, email, password) => {
    const response = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
    });
    return response.data;
}

export const logout = async () => {
  await axios.post(`${BASE_URL}/logout`);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login"; // chuyển về trang login
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(`${BASE_URL}/refresh`, { refreshToken });
  const { accessToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  return accessToken;
};

