// src/api/globalAPI.js

const BASE_URL = 'http://localhost:3000/api/'; // Thay đổi URL thành địa chỉ API backend của bạn

export const getHospital = async () => {
  try {
    const response = await fetch(`${BASE_URL}/hospitals`);
    if (!response.ok) {
      throw new Error('Failed to fetch hospital data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    return null;
  }
};

const GlobalAPI = {
  getHospital,
};

export default GlobalAPI;
