import { instance } from '../api-instance-provider';

// Hàm lấy danh sách tất cả matches
export const getAllMatches = async () => {
    try {
        const response = await instance.get('/admin/match', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response?.data?.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : { message: 'An error occurred while fetching users' };
    }
};
