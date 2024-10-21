import { instance } from './api-instance-provider'; 

export const sendResetPasswordRequest = async (email) => {
  try {
    const response = await instance.post('/auth/forgot-password', {
      email: email
    });

    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
