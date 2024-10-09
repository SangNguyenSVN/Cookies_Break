import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../services/authService'; // Đoạn code bạn đã viết

interface User {
    id: string;
    username: string;
    phoneNumber: string;
    role: {
        id: string;
        name: string;
        permissions: string[];
    };
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuth = (): AuthContextType => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Kiểm tra localStorage khi khởi động
    useEffect(() => {
        const loadStoredData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        };

        loadStoredData();
    }, []);

    // Hàm đăng nhập
    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await authAPI.login(username, password);
            if (response) {
                setUser(response.user);
                setToken(response.token);

                // Lưu trữ vào AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
                await AsyncStorage.setItem('token', response.token);
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        }
    };

    // Hàm đăng xuất
    const logout = async (): Promise<void> => {
        try {
            await authAPI.logout();
            setUser(null);
            setToken(null);

            // Xóa thông tin khỏi AsyncStorage
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    };

    return {
        user,
        token,
        login,
        logout,
    };
};
