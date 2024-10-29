import {instance} from './api-instance-provider';

// Hàm tạo mới quán cafe
export const createLocation = async (locationData) => {
  try {
    const response = await instance.post('/location', locationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : {message: 'An error occurred while creating cafe'};
  }
};

// Hàm tạo mới quán cafe
export const checkUserLocation = async (userId) => {
  try {
    const response = await instance.get(`/location/isConfigLocation/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : {message: 'An error occurred while creating cafe'};
  }
};

export async function fetchNearbyUsers(userId, range) {
  try {
    const response = await instance.get(`/location/nearby?userId=${userId}&range=${range}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : {message: 'An error occurred while creating cafe'};
  }
}
