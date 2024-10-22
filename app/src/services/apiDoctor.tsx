import axios from 'axios';
import apiClient from './apiClient';

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật
interface UpdatePatientInput {
    username?: string;    // Có thể không có (optional)
    phoneNumber?: string; // Có thể không có (optional)
    email?: string;       // Có thể không có (optional)
    gender?: string;      // Có thể không có (optional)
    dateOfBirth?: Date;   // Có thể không có (optional)
    fullname?: string;
    address?: string; 
    imageUrl?: string;    // Có thể không có (optional)
}



const updatePatient = async (
    updatedData: UpdatePatientInput,
): Promise<{ message: string }> => {
    try {
        const url = '/user/doctor/update'; // Chỉ cần đường dẫn tương đối

        console.log('URL:', url);
        console.log("Data", updatedData);

        const response = await apiClient.put<{ message: string }>(
            url,
            { ...updatedData }
        );

        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật bệnh nhân:', error);

        // Xử lý lỗi
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật bệnh nhân thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};



// Xuất các hàm
export default {
    updatePatient,
};
