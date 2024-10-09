import axios, { AxiosResponse } from 'axios';

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

// Hàm để đăng nhập cho mọi người dùng thử api
const loginUser = async () => {
    try {
        const loginResponse = await login("test", "1"); // Không cần truyền role
        console.log("Login Response:", loginResponse); // In toàn bộ phản hồi từ API

        if (loginResponse && loginResponse.user) {
            console.log("User role:", loginResponse.user.role); // Truy cập role từ user
        } else {
            console.error("Login response hoặc user là null hoặc undefined");
        }
    } catch (error) {
        console.error("Login error:", error);
    }
};

// logout
const logout = async () => {
    try {
        const token = localStorage.getItem('token'); // Hoặc sử dụng AsyncStorage trong React Native
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.removeItem('token'); // Xóa token khỏi local storage
        // Thực hiện thêm các hành động khác như chuyển hướng người dùng về trang đăng nhập
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
    loginUser
};
