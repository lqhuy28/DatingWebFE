import { instance } from './api-instance-provider'; // Sử dụng axios instance đã thiết lập

export const updateProfile = async (name, phone, age, bio, gender, files) => {
  try {
    // Tạo FormData để gửi dữ liệu multipart/form-data
    const formData = new FormData();
    
    // Append chuỗi JSON cho `updateProfileRequest`
    const updateProfileRequest = JSON.stringify({ name, phone, age, bio, gender });
    formData.append('updateProfileRequest', updateProfileRequest);

    // Thêm từng file vào FormData
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }

    // Gửi yêu cầu cập nhật hồ sơ
    const response = await instance.post('/users/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Bearer token cho Authorization
      },
    });

    return response.data; // Trả về data từ server
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};
