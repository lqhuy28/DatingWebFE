import { instance } from './api-instance-provider'; // Sử dụng axios instance đã thiết lập trước đó

export const changePassword = async (email, oldPassword, newPassword) => {
    try {
      const response = await instance.post('/auth/change-password', {
        email, // Email từ localStorage
        oldPassword,
        newPassword,
      });
      return response.data; // Trả về response từ server
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  };
  
