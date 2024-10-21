import { instance } from '../api-instance-provider';

// Hàm lấy danh sách tất cả các contact form
export const getAllContactForms = async () => {
  try {
    const response = await instance.get('/admin/contact-form', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response?.data?.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while fetching contact forms' };
  }
};

// Hàm trả lời contact form
export const replyToContactForm = async (id, replyMessage) => {
  try {
    const response = await instance.put(
      `/admin/contact-form/${id}/reply`, {
        replyMessage: replyMessage
      }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
      },
    });
    return response.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An error occurred while replying to the contact form' };
  }
};
