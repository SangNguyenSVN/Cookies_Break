import axios, { AxiosInstance as AxiosInstanceType, AxiosResponse } from "axios";

// Cấu hình base URL của API Express
const BASE_URL = "http://localhost:3000/api"; // hoặc IP của server nếu bạn đang phát triển từ thiết bị khác

// Tạo instance của Axios, không cần API_KEY
const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: BASE_URL
});


// http://localhost:3000/api/doctors
const getDoctors = (): Promise<AxiosResponse> =>
  AxiosInstance.get("/doctors");

// http://localhost:3000/api/appointments?filters[email]=test@example.com
const getAppointmentByDoctorId = (doctorId: string): Promise<AxiosResponse> =>
  AxiosInstance.get(`/appointments?filters[doctorId]=${doctorId}`);


// Export các hàm API
export default {
  getDoctors,
  getAppointmentByDoctorId,
};
