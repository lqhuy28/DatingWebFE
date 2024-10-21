import { instance } from "./api-instance-provider"; // Assume this contains the Axios instance

export const registerUser = async (email) => {
  try {
    const response = await instance.post("/auth/register", { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "An error occurred" };
  }
};
