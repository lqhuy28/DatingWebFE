import { instance } from '../api-instance-provider';

// Hàm lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await instance.get('/admin/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response?.data?.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : { message: 'An error occurred while fetching users' };
    }
};

// Hàm lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
    try {
        const response = await instance.get(`/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : { message: 'An error occurred while fetching user' };
    }
};

// Hàm khoá hoặc mở khoá người dùng
export const lockOrUnLockUser = async (id) => {
    try {
        const response = await instance.put(`/admin/user/${id}/lockOrUnLock`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : { message: 'An error occurred while updating user' };
    }
};
