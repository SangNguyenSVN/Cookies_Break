import axios from 'axios';
import apiClient from './apiClient'; 

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật bệnh nhân
interface UpdatePatientInput {
    fullname?: string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    image?: string;
}

// Hàm để cập nhật thông tin bệnh nhân
const updatePatient = async (
    id:string,
    updatedData: UpdatePatientInput,
    imageUri?: string,
    imageType?: string,
): Promise<{ message: string }> => {
    try {
        const url = `/user/patients/${id}`; 

        console.log('URL:', url);
        console.log("Data", updatedData);

        const formData = new FormData();

        console.log('FormData:', formData); 
        console.log('imageUri:', imageUri);
        console.log('imageType:', imageType);
        
        // Nếu có hình ảnh, thêm nó vào FormData
        if (imageUri && imageType) {
            const imageName = imageUri.split('/').pop() || 'image.jpg'; // Lấy tên file từ đường dẫn
            formData.append('image', {
                uri: imageUri,          // Đường dẫn tệp hình ảnh trên thiết bị
                type: imageType,        // Loại MIME của ảnh, ví dụ: 'image/jpeg'
                name: imageName,        // Tên của tệp ảnh
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

        return response.data; // Trả về dữ liệu nhận được
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
