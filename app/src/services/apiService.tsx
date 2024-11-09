import apiClient from './apiClient';
import { AxiosResponse } from "axios";

// Hàm để lấy thông tin bệnh viện
const getHospitals = (): Promise<AxiosResponse> => {
    return apiClient.get('/hospitals/');
};

const getDoctors = (): Promise<AxiosResponse> => {
    return apiClient.get('/user/doctors/')
}

const getNews = (): Promise<AxiosResponse> => {
    return apiClient.get('/news/')
}

const getDepartments = (): Promise<AxiosResponse> => {
    return apiClient.get('/departments/')
}

const getAppointmentByDoctor = (doctorId: string): Promise<AxiosResponse> => {
    return apiClient.get(`/appointments/doctor/${doctorId}`);
};
const getMedicinesByHospital = (hospitalId: string): Promise<AxiosResponse> => {
    return apiClient.get(`/medicines/hospital/${hospitalId}`);
};
const postAppointment = (appointmentData: {
    patient: string;
    doctor: string;
    package: string;
    time: string;
    date: string;
    notes: string;
    fullname: string;
    email: string;
    phoneNumber: string;
}): Promise<AxiosResponse> => {
    return apiClient.post('/appointments', appointmentData);
};

const getDateAppointmentByDoctor = (doctorId: string): Promise<AxiosResponse> => {
    return apiClient.get(`/appointments/date-time/${doctorId}`);
};


const getAppointmentbyUser = (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/appointments/by-patient/${id}`);
};
const getAppopintmentByDoctor = (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/appointments/doctor/${id}`)
}
const apiService = {
    getHospitals,
    getDoctors,
    getNews,
    getDepartments,
    postAppointment,
    getAppointmentByDoctor,
    getMedicinesByHospital,
    getDateAppointmentByDoctor,
    getAppointmentbyUser,
    getAppopintmentByDoctor
};

export default apiService; 