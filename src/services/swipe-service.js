import { instance } from './api-instance-provider';

export const swipeAction = async (targetUserId, isLike) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem('userToken');

    // Kiểm tra token
    if (!token) {
      throw new Error('Token không tìm thấy. Vui lòng đăng nhập lại.');
    }

    // Define the request payload
    const payload = {
      targetUserId,
      isLike,
    };

    // Make POST request to swipe API endpoint with Authorization header
    const response = await instance.post('/swipes/swipe', payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });

    return response.data.data; // Returning the response data on success
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while performing swipe action' };
  }
};
