import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu cho dữ liệu phản hồi
interface RegisterResponse {
    message: string;
    user?: {
        id: string;
        username: string;
        phoneNumber: string;
        role: {
            id: string;
            name: string;
            permissions: string[];
        };
    };
}

interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        username: string;
        phoneNumber: string;
        email: string;          // Thêm trường email
        gender: string;         // Thêm trường gender
        dateOfBirth: Date;    // Thêm trường dateOfBirth
        fullname: string;       // Thêm trường fullname
        role: {
            id: string;
            name: string;
            permissions: string[];
        };
    };
}

const API_URL = 'http://192.168.1.3:3000/auth'; // Đổi thành URL thực tế của bạn

// Đăng ký bệnh nhân
const registerPatient = async (username: string, password: string, phoneNumber: string, roleId: string): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_URL}/register/patient`, {
        username,
        password,
        phoneNumber,
        roleId, // Thêm roleId vào body
    });
    return response.data;
};

// Đăng ký bác sĩ
const registerDoctor = async (username: string, password: string, phoneNumber: string, roleId: string): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_URL}/register/doctor`, {
        username,
        password,
        phoneNumber,
        roleId, // Thêm roleId vào body
    });
    return response.data;
};

// Đăng nhập
const login = async (username: string, password: string): Promise<LoginResponse | undefined> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, {
            username,
            password,
            // Không cần role ở đây
        });
        
        // Lưu user và token vào AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('token', response.data.token);

        return response.data; // Trả về phản hồi
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Lỗi đăng nhập:', error.response.data);
        } else {
            console.error('Lỗi không xác định:', error);
        }
    }

    return undefined; // Trả về undefined nếu có lỗi
};

// logout
const logout = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); // Sử dụng AsyncStorage
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        await AsyncStorage.removeItem('token'); // Xóa token khỏi AsyncStorage
        await AsyncStorage.removeItem('user'); // Xóa user khỏi AsyncStorage
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
};

export default {
    registerPatient,
    registerDoctor,
    login,
    logout,
};
