import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';

// Định nghĩa kiểu cho dữ liệu phản hồi
interface RegisterResponse {
    message: string;
    user?: {
        id: string;
        username: string;
        phoneNumber: string;
        roleId: {
            id: string;
            name: string;
            permissions: string[];
        };
    };
}

interface LoginResponse {
  
    token: string;
<<<<<<< HEAD
   
}

const API_URL = 'http://192.168.1.13:3000/auth'; // Đổi thành URL thực tế của bạn
=======
    user: {
        id: string;
        username: string;
        phoneNumber: string;
        email: string;
        gender: string;
        dateOfBirth: Date;
        fullname: string;
        address: string;
        role: {
            id: string;
            name: string;
            permissions: string[];
        };
    };
}

const API_URL = 'http://192.168.1.4:3000/api/auth'; // Đổi thành URL thực tế của bạn
>>>>>>> f4489b7af3607beec18bf2ba8d7c565354a2d687

// Hàm đăng ký chung
const registerUser = async (type: 'patient' | 'doctor', username: string, password: string, phoneNumber: string, roleId: string): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_URL}/register/${type}`, {
        username,
        password,
        phoneNumber,
        roleId,
    });
    return response.data;
};

// Đăng ký bệnh nhân và bác sĩ
const registerPatient = (username: string, password: string, phoneNumber: string, roleId: string) =>
    registerUser('patient', username, password, phoneNumber, roleId);

const registerDoctor = (username: string, password: string, phoneNumber: string, roleId: string) =>
    registerUser('doctor', username, password, phoneNumber, roleId);

// Đăng nhập
const login = async (username: String, password: string, roleId: string): Promise<LoginResponse | undefined> => {
    try {
<<<<<<< HEAD
        console.log('Attempting to log in with:' + roleId);
        
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, {
            username,
            password,
            roleId
        
        });
        
        return response.data; // Return response if successful
=======
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, { username, password });

        // Lưu user và token vào AsyncStorage
        await AsyncStorage.multiSet([
            ['user', JSON.stringify(response.data.user)],
            ['token', response.data.token],
        ]);

        return response.data;
>>>>>>> f4489b7af3607beec18bf2ba8d7c565354a2d687
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Lỗi đăng nhập:', error.response?.data);
        } else {
            console.error('Lỗi không xác định:', error);
        }
    }
<<<<<<< HEAD

    return undefined; // Return undefined if there's an error
};

// Hàm để đăng nhập cho mọi người dùng thử api
// const loginUser = async () => {
//     try {
//         const loginResponse = await login("test", "1","patient"); // Không cần truyền role
//         console.log("Login Response:", loginResponse); // In toàn bộ phản hồi từ API

//         if (loginResponse && loginResponse.user) {
//             console.log("User role:", loginResponse.user.roleId); // Truy cập role từ user
//         } else {
//             console.error("Login response hoặc user là null hoặc undefined");
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//     }
// };
=======
    return undefined;
};


const updateAccount = async (username: string, password?: string): Promise<{ message: string }> => {
    const data = { username, ...(password && { password }) }; // Chỉ thêm password nếu có
    try {
        const response = await apiClient.put('/auth/account/update', data);
        return response.data;
    } catch (error) {
        console.error('Lỗi thay đổi tài khoản:', axios.isAxiosError(error) ? error.response?.data : error);
        throw new Error('Không thể thay đổi tài khoản');
    }
};
>>>>>>> f4489b7af3607beec18bf2ba8d7c565354a2d687

// Đăng xuất
const logout = async () => {
    try {
        await apiClient.post('/auth/logout', {});
        await AsyncStorage.multiRemove(['token', 'user']);
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
        throw error;
    }
};

export default {
    registerPatient,
    registerDoctor,
    login,
    logout,
<<<<<<< HEAD
    // loginUser
=======
    updateAccount,
>>>>>>> f4489b7af3607beec18bf2ba8d7c565354a2d687
};
