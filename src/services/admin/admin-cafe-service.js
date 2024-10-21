import {instance} from '../api-instance-provider';

// Hàm lấy danh sách tất cả các quán cafe
export const getAllCafes = async () => {
    try {
        const response = await instance.get('/admin/cafes', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response?.data?.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : {message: 'An error occurred while fetching cafes'};
    }
};

// Hàm tạo mới quán cafe
export const createCafe = async (cafeRequest) => {
    try {
        const response = await instance.post('/admin/cafes', cafeRequest, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : {message: 'An error occurred while creating cafe'};
    }
};

// Hàm cập nhật quán cafe
export const updateCafe = async (id, cafeRequest) => {
    try {
        const response = await instance.put(`/admin/cafes/${id}`, cafeRequest, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : {message: 'An error occurred while updating cafe'};
    }
};

// Hàm lấy thông tin quán cafe theo ID
export const getCafeById = async (id) => {
    try {
        const response = await instance.get(`/admin/cafes/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : {message: 'An error occurred while fetching cafe'};
    }
};

// Hàm cập nhật quán cafe
export const lockOrUnLock = async (id) => {
    try {
        const response = await instance.put(`/admin/cafes/${id}/lockOrUnLock`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về data nếu API trả về đúng định dạng
    } catch (error) {
        throw error.response ? error.response.data : {message: 'An error occurred while updating cafe'};
    }
};
