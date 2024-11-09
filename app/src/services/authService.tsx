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



// Hàm đăng ký chung
const registerUser = async (type: 'patient' | 'doctor', username: string, password: string, phoneNumber: string): Promise<RegisterResponse> => {
    const response = await apiClient.post(`/auth/register/${type}`, {
        username,
        password,
        phoneNumber,
    
    });
    return response.data;
};
 
// Đăng ký bệnh nhân và bác sĩ
const registerPatient = (username: string, password: string, phoneNumber: string) =>
    registerUser('patient', username, password, phoneNumber);

// Đăng nhập
const login = async (username: string, password: string, userType: string) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password, userType });

        // Lưu user và token vào AsyncStorage
        await AsyncStorage.multiSet([
            ['user', JSON.stringify(response.data.user)],
            ['token', response.data.token],
        ]);

        return response.data;
    } catch (error: any) {
        console.error('Lỗi đăng nhập:', error.response?.data);
    }
    return undefined;
};

const updateAccount = async (
    id: string,
    password: string,
    newPassword: string,
    userType: 'patient' | 'doctor' = 'patient' // Default to 'patient' if not provided
): Promise<{ message: string }> => {
    const data = { password, newPassword }; // Send both old and new password

    try {
        // Determine the correct API endpoint based on userType
        const endpoint = userType === 'doctor' ? `user/doctors/change-password/${id}` : `user/patients/change-password/${id}`;

        // Send a PUT request with old and new passwords to the correct endpoint
        const response = await apiClient.put(endpoint, data);

        // Return the response from the server
        return response.data;
    } catch (error: any) {
        console.error('Error updating account:', error.response?.data || error.message);

        // Throw an error with a descriptive message
        throw new Error('Unable to update account password');
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
    login,
    logout,
    updateAccount,
};
