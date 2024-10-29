import { instance } from "./api-instance-provider";

// Function to get all subscription plans
export const getAllLikedMe = async () => {
  try {
    const response = await instance.get("/swipes/likedMe", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    console.log("🚀 ~ getAllLikedMe ~ response.data.data:", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "An error occurred while fetching subscription plans" };
  }
};
