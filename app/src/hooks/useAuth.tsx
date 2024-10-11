import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../services/authService';

// Định nghĩa kiểu User
interface Role {
    id: string;
    name: string;
    permissions: string[];
}

interface User {
    id: string;
    username: string;
    phoneNumber: string;
    email: string;        // Thêm trường email
    gender: string;       // Thêm trường gender
    dateOfBirth: Date;    // Thêm trường dateOfBirth
    fullname: string;     // Thêm trường fullname
    role: Role;           // Định nghĩa kiểu Role
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    error: string | null; // Thêm thuộc tính error để lưu trữ thông báo lỗi
}

export const useAuth = (): AuthContextType => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Khởi tạo trạng thái lỗi

    // Kiểm tra AsyncStorage khi khởi động
    useEffect(() => {
        const loadStoredData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser)); // Chuyển đổi dữ liệu JSON thành đối tượng
                setToken(storedToken);
            }
        };

        loadStoredData();
    }, []);

    // Hàm đăng nhập
    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response: any = await authAPI.login(username, password);
            if (response) {
                // Lưu toàn bộ dữ liệu user và token vào state
                setUser(response.user);
                setToken(response.token);

                // Lưu vào AsyncStorage để giữ thông tin khi ứng dụng khởi động lại
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
                await AsyncStorage.setItem('token', response.token);
                setError(null); // Reset error nếu đăng nhập thành công
            }
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin.'); // Xử lý lỗi
            console.error(err); // Log lỗi chi tiết
        }
    };

    // Hàm đăng xuất

    return {
        user,
        token,
        login,
        error, // Trả về thông báo lỗi
    };
};
