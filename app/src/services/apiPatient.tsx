import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật
interface UpdatePatientInput {
    username?: string;    // Có thể không có (optional)
    phoneNumber?: string; // Có thể không có (optional)
    email?: string;       // Có thể không có (optional)
    gender?: string;      // Có thể không có (optional)
    dateOfBirth?: Date;   // Có thể không có (optional)
    fullname?: string;    // Có thể không có (optional)
}

const API_URL = 'http://localhost:3000/api/patients';

// Hàm để tạo headers với token
const createHeaders = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
        'Content-Type': 'application/json', // Đặt kiểu content type nếu cần
    },
});

// 1. Cập nhật thông tin bệnh nhân
const updatePatient = async (
    patientId: string,
    updatedData: UpdatePatientInput,
    token: string
): Promise<{ message: string }> => {
    try {
        const response = await axios.put<{ message: string }>(
            `${API_URL}/update-info/${patientId}`,
            updatedData,
            createHeaders(token) // Gửi token trong header
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin bệnh nhân:', error); // Log lỗi chi tiết

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật thông tin thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// 2. Xóa người dùng
const deleteUser = async (
    userId: string,
    token: string
): Promise<{ message: string }> => {
    try {
        const response = await axios.delete<{ message: string }>(
            `${API_URL}/${userId}`,
            createHeaders(token) // Gửi token trong header
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa bệnh nhân:', error); // Log lỗi

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Xóa bệnh nhân thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Xuất các hàm
export default {
    updatePatient,
    deleteUser,
};
