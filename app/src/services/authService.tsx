import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient'; // Đảm bảo đường dẫn đúng

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

<<<<<<< HEAD

=======
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
>>>>>>> f031cfe18ce236131c7db6e19772888c54d204ac

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
<<<<<<< HEAD
const login = async (username: string, password: string, userType: string) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password, userType });
=======
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
>>>>>>> f031cfe18ce236131c7db6e19772888c54d204ac

        // Lưu user và token vào AsyncStorage
        await AsyncStorage.multiSet([
            ['user', JSON.stringify(response.data.user)],
            ['token', response.data.token],
        ]);

        return response.data;
<<<<<<< HEAD
    } catch (error: any) {
        console.error('Lỗi đăng nhập:', error.response?.data);
=======
>>>>>>> f4489b7af3607beec18bf2ba8d7c565354a2d687
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Lỗi đăng nhập:', error.response?.data);
        } else {
            console.error('Lỗi không xác định:', error);
        }
>>>>>>> f031cfe18ce236131c7db6e19772888c54d204ac
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

const updateAccount = async (password?: string, userType?: string): Promise<{ message: string }> => {
    const data: any = {}; // Tạo đối tượng rỗng để chứa dữ liệu

    // Chỉ thêm password nếu có
    if (password) {
        data.password = password;
    }

    // Thêm userType nếu có
    if (userType) {
        data.userType = userType;
    }

    try {
        // Gửi yêu cầu PUT tới endpoint cập nhật tài khoản
        const response = await apiClient.put('/change/password', data);

        // Trả về phản hồi từ server
        return response.data;
    } catch (error: any) {
        console.error('Lỗi thay đổi tài khoản:', error.response?.data || error.message);

        // Ném lỗi với thông điệp phù hợp
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
