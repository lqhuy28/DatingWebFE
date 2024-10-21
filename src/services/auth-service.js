import { jwtDecode } from "jwt-decode"; // Dùng thư viện jwt-decode để giải mã token

export const getLoggedInUser = async () => {
  // Lấy token từ localStorage
  const token = localStorage.getItem("userToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  } else {
    console.error("No token found in localStorage.");
    return null;
  }
};
