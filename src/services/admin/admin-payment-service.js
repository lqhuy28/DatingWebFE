import { instance } from '../api-instance-provider';

// Hàm lấy danh sách tất cả các giao dịch thanh toán
export const getAllPayments = async () => {
    try {
        const response = await instance.get('/admin/payment', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response?.data?.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : { message: 'An error occurred while fetching payments' };
    }
};
