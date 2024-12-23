import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.VITE_PUBLIC_BASE_URL || "https://datingwebbe-1.onrender.com/api/v1",
    headers: {
      'Content-Type': 'application/json',  // Đảm bảo header Content-Type được gửi đúng
    },
});

export const Login = {
  ORIGIN: "auth/login", // Đường dẫn API login
};