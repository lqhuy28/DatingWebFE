import { instance } from "./api-instance-provider";

// Function to get all subscription plans
export const getAllSubscriptionPlans = async () => {
  try {
    const response = await instance.get("/subscriptionPlan", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "An error occurred while fetching subscription plans" };
  }
};
