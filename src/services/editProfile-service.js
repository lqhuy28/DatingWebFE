import { instance } from "./api-instance-provider"; // Ensure this imports your Axios instance

export const editUserProfile = async (email, profileData) => {
  console.log("🚀 ~ editUserProfile ~ profileData:", profileData)
  console.log("🚀 ~ editUserProfile ~ email:", email)
  try {
    const response = await instance.post(`/update-profile?email=${email}`, profileData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};
