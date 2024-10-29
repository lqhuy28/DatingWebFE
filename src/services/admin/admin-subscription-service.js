// admin-subscription-service.js
import { instance } from '../api-instance-provider';

// Lấy tất cả các gói đăng ký của người dùng
export const getAllUserSubscriptions = async () => {
  try {
    const response = await instance.get('/admin/user-subscriptions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response?.data?.data; // Trả về danh sách gói từ API
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching subscriptionPlan' };
  }
};

// Hàm lấy thông tin người dùng theo ID
export const getUserSubscriptionById = async (id) => {
  try {
    const response = await instance.get(`/admin/user-subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data?.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching user' };
  }
};

// Hàm gọi API để lấy thống kê số lượng gói đã bán
export const getSubscriptionStats = async (filter) => {
  try {
    const response = await instance.get(`/admin/user-subscriptions/stats/${filter}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching subscription stats' };
  }
};

// Hàm gọi API để lấy thống kê số lượng gói đã bán
export const getRevenueStats = async (filter) => {
  try {
    const response = await instance.get(`/admin/user-subscriptions/revenue/${filter}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching subscription stats' };
  }
};
