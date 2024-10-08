import axios, { AxiosResponse } from 'axios';

// Định nghĩa kiểu cho dữ liệu phản hồi
interface RegisterResponse {
    message: string;
    user?: {
        id: string;
        username: string;
        phoneNumber: string;
        role: string;
    };
}

interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        username: string;
        phoneNumber: string;
        role: string;
    };
}

const API_URL = 'http://192.168.1.2:3000/auth'; // Đổi thành URL thực tế của bạn

// Đăng ký bệnh nhân
const registerPatient = async (username: string, password: string, phoneNumber: string): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_URL}/register/patient`, {
        username,
        password,
        phoneNumber,
    });
    return response.data;
};

// Đăng ký bác sĩ
 const registerDoctor = async (username: string, password: string, phoneNumber: string): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_URL}/register/doctor`, {
        username,
        password,
        phoneNumber,
    });
    return response.data;
};

// Đăng nhập
const login = async (username: string, password: string, role: string): Promise<LoginResponse | undefined> => {
  try {
      const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, {
          username,
          password,
          role,
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


const loginUser = async () => {
  try {
      const loginResponse = await login("test", "1", "patient");
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


export default {
  registerPatient,
  registerDoctor,
  login,
  loginUser
}
