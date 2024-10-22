import apiClient from './apiClient'; 
import { AxiosResponse } from "axios";

// Hàm để lấy thông tin bệnh viện
const getHospitals = (): Promise<AxiosResponse> => {
    return apiClient.get('/hospitals'); 
};

const getDoctors = (): Promise<AxiosResponse> => {
    return apiClient.get('/user/doctors/')
}

// Bạn có thể thêm nhiều hàm API khác ở đây
// Ví dụ:
// const getHospitalById = async (id) => { ... }

const apiService = {
    getHospitals,
    getDoctors,
    // getHospitalById, // Thêm hàm khác vào đối tượng nếu cần
    // Thêm các hàm API khác vào đây
};

// Xuất đối tượng chứa các hàm API
export default apiService; // Xuất đối tượng hospitalService
