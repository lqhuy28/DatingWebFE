import { instance } from './api-instance-provider'; // Sử dụng axios instance đã thiết lập

export const logoutUser = async (token) => {
  try {
    const response = await instance.post('/auth/logout', token, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.clear();

    return response.data;
  } catch (error) {
    throw new Error('Error during logout: ' + error.message);
  }
};
