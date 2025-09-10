import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3002",
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Password reset API functions
export const requestPasswordReset = async (email) => {
  const response = await authApi.post("/api/password-reset/request", { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await authApi.post("/api/password-reset/reset", {
    token,
    newPassword,
  });
  return response.data;
};

export const verifyResetToken = async (token) => {
  const response = await authApi.post(`/api/password-reset/verify/${token}`);
  return response.data;
};

export default authApi;
