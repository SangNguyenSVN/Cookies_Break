import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../services/authService';

// Định nghĩa kiểu User
interface Role {
    id: string;
    name: string;
    permissions: string[];
}



interface AuthContextType {
    user: any | null;
    token: string | null;
    login: (username: string, password: string, userType: string) => Promise<void>;
    logout: () => Promise<void>; // Thêm hàm logout
    error: string | null; // Thêm thuộc tính error để lưu trữ thông báo lỗi
}

export const useAuth = (): AuthContextType => {
    const [user, setUser] = useState<any | null>(null);
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
    const login = async (username: string, password: string, userType: string) => {
        try {
            const response: any = await authAPI.login(username, password, userType);
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
    const logout = async (): Promise<void> => {
        try {
            setUser(null); // Xóa user khỏi state
            setToken(null); // Xóa token khỏi state

            // Xóa thông tin khỏi AsyncStorage
            await AsyncStorage.multiRemove(['user', 'token']);
        } catch (err) {
            console.error('Lỗi đăng xuất:', err);
        }
    };

    return {
        user,
        token,
        login,
        logout, // Trả về hàm logout
        error, // Trả về thông báo lỗi
    };
};
