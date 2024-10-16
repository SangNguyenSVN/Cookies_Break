import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient'; // Đảm bảo đường dẫn đúng

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

// Hàm đăng ký chung
const registerUser = async (type: 'patient' | 'doctor', username: string, password: string, phoneNumber: string, roleId: string): Promise<RegisterResponse> => {
    const response = await apiClient.post(`/auth/register/${type}`, {
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
const login = async (username: string, password: string): Promise<LoginResponse | undefined> => {
    try {
        const response = await apiClient.post('/auth/login', { username, password });

        // Lưu user và token vào AsyncStorage
        await AsyncStorage.multiSet([
            ['user', JSON.stringify(response.data.user)],
            ['token', response.data.token],
        ]);

        return response.data;
    } catch (error) {
        console.error('Lỗi đăng nhập:', error.response?.data);
    }
    return undefined;
};

const updateAccount = async (username: string, password?: string): Promise<{ message: string }> => {
    const data = { username, ...(password && { password }) }; // Chỉ thêm password nếu có
    try {
        const response = await apiClient.put('/auth/account/update', data);
        return response.data;
    } catch (error) {
        console.error('Lỗi thay đổi tài khoản:', error.response?.data);
        throw new Error('Không thể thay đổi tài khoản');
    }
};

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
    updateAccount,
};
