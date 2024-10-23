import apiClient from './apiClient'; 
import { AxiosResponse } from "axios";

// Hàm để lấy thông tin bệnh viện
const getHospitals = (): Promise<AxiosResponse> => {
    return apiClient.get('/hospitals'); 
};

const getDoctors = (): Promise<AxiosResponse> => {
    return apiClient.get('/user/doctors/')
}

const getNews = (): Promise<AxiosResponse> => {
    return apiClient.get('/news/')
}


const apiService = {
    getHospitals,
    getDoctors,
    getNews,
  
};

export default apiService; 