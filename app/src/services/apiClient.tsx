// apiClient.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.6:3000/api/';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Middleware để thêm token vào header trước khi gửi request
apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json'; // Đặt Content-Type
    }
    return config;
});

export default apiClient;
