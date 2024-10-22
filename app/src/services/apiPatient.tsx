import axios from 'axios';
import apiClient from './apiClient';

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật
interface UpdatePatientInput {
    username?: string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    fullname?: string;
    address?: string;
    imageUrl?: string;
}

const updatePatient = async (
    updatedData: UpdatePatientInput,
    imageUri?: string,
    imageType?: string,
): Promise<{ message: string }> => {
    try {
        const url = '/user/patients/update';

        console.log('URL:', url);
        console.log("Data", updatedData);

        const formData = new FormData();

        if (imageUri && imageType) {
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageUri.split('/').pop() || 'image.jpg',
            } as any);
        }

        // Duyệt qua từng key trong updatedData
        for (const key in updatedData) {
            const value = updatedData[key as keyof UpdatePatientInput];
            if (value !== undefined) {
                formData.append(key, value);
            }
        }

        const response = await apiClient.put<{ message: string }>(url, formData);

        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật bệnh nhân:', error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật bệnh nhân thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};


// Xóa người dùng
const deleteUser = async (userId: string): Promise<{ message: string }> => {
    try {
        const response = await apiClient.delete<{ message: string }>(
            `/user/patients/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa bệnh nhân:', error);

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
