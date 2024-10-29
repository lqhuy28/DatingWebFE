import { instance } from './api-instance-provider';

// Hàm lấy gói đăng ký hiện tại của người dùng
export const getCurrentSubscriptionPlan = async () => {
  try {
    const response = await instance.get('/subscriptions/current', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi từ API hoặc thông báo mặc định
    throw error.response ? error.response.data : { message: 'An error occurred while fetching the current subscription plan' };
  }
};