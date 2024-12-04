import apiClient from './apiClient';
import { Axios, AxiosResponse } from "axios";


interface AppointmentRecord {
    appointmentId: string;
    details: {
        medicineId: string;
        quantity: number;
    }[];
}
interface Payment {
    userId: string,
    appointmentId: string,
    total: number,
    currency: string,
}
interface dataEvalution {
    hospitalId: string,
    patientId: string,
    score: number,
    comment: string,
}
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
const getHospitalsDepartment = (name: string): Promise<AxiosResponse> => {
    return apiClient.get(`/hospitals/department/${name}`)
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
const getAppointmentByEmail = (email: string): Promise<AxiosResponse> => {
    return apiClient.get(`/appointments/by-email/${email}`)
}
const postRecordByDoctor = (dataRecord: AppointmentRecord): Promise<AxiosResponse> => {
    return apiClient.post('/records', dataRecord);  // Gửi dataRecord vào body của request
}

const putAppointmentStatus = (id: string, statusName: string, reason: string): Promise<AxiosResponse> => {
    return apiClient.put(`/appointments/update-status/${id}`, {
        statusName,
        reason,
    })
}


const getEvalutionByHospital = (hospitalId: string): Promise<AxiosResponse> => {
    return apiClient.get(`/evalutions/hospital/${hospitalId}`)
}

const postEvalutionByPatient = (dataEvalution: dataEvalution): Promise<AxiosResponse> => {
    return apiClient.post('/evalutions', dataEvalution);  // Gửi dataRecord vào body của request
}



const createPayment = (data: Payment): Promise<AxiosResponse> => {
    return apiClient.post('create-payment', data)
}

const getRecordByAppointment = (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/records/appointment/${id}`)
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
    getAppopintmentByDoctor,
    getHospitalsDepartment,
    getAppointmentByEmail,
    postRecordByDoctor,
    putAppointmentStatus,
    getEvalutionByHospital,
    postEvalutionByPatient,
    createPayment,
    getRecordByAppointment
};

export default apiService; 