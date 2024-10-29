import { instance } from '../api-instance-provider';

// Hàm lấy danh sách các gói đăng ký
export const getAllSubscriptionPlans = async () => {
  try {
    const response = await instance.get('/admin/subscriptionPlan', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response?.data?.data; // Trả về danh sách gói từ API
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching subscriptionPlan' };
  }
};

// Hàm cập nhật thông tin gói đăng ký
export const updateSubscriptionPlan = async (subscriptionPlan) => {
  try {
    const response = await instance.put(`/admin/subscriptionPlan/${subscriptionPlan.planId}`, subscriptionPlan, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về dữ liệu sau khi cập nhật thành công
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while updating subscriptionPlan' };
  }
};