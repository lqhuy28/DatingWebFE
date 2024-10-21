import { jwtDecode } from "jwt-decode"; // Dùng thư viện jwt-decode để giải mã token
import { instance } from "./api-instance-provider"; // Import instance API

// Lấy thông tin người dùng từ token
export const getLoggedInUser = () => {
  const token = localStorage.getItem("userToken");
  console.log("🚀 ~ getLoggedInUser ~ token:", token);
  if (token) {
    try {
      // Giải mã token để lấy thông tin user (vd: userId, email)
      const decodedToken = jwtDecode(token);
      return decodedToken; // Trả về thông tin giải mã từ token
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  } else {
    console.error("No token found in localStorage.");
    return null;
  }
};

// Hàm lấy thông tin profile của người dùng
export const getMyProfile = async () => {
  const loggedInUser = getLoggedInUser();

  if (loggedInUser && loggedInUser.userId) {
    try {
      const token = localStorage.getItem("userToken");

      // Gọi API để lấy profile của người dùng
      const response = await instance.get(`/profiles/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header để xác thực
        },
      });

      if (response.data) {
        console.log("🚀 ~ getMyProfile ~ response.data:", response.data);
        return response.data;
      } else {
        throw new Error("Profile data not found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  } else {
    console.error("No logged-in user found.");
    return null;
  }
};

export const updateProfile = async (name, phone, age, bio, gender, files) => {
  try {
    // Tạo FormData để gửi dữ liệu multipart/form-data
    const formData = new FormData();

    // Append chuỗi JSON cho `updateProfileRequest`
    const updateProfileRequest = JSON.stringify({
      name,
      phone,
      age,
      bio,
      gender,
    });
    formData.append("updateProfileRequest", updateProfileRequest);

    // Thêm từng file vào FormData
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    // Gửi yêu cầu cập nhật hồ sơ
    const response = await instance.put("/users/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Bearer token cho Authorization
      },
    });

    return response.data; // Trả về data từ server
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};