import React from 'react';
import { Button, Alert } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';

const LogoutButton = () => {
  const { signOut } = useClerk(); // Lấy hàm signOut từ Clerk

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert('Thành công', 'Bạn đã đăng xuất thành công!');
      // Chuyển hướng đến trang công khai
      // Ví dụ: navigation.navigate('PublicScreen'); nếu bạn sử dụng React Navigation
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi đăng xuất.');
    }
  };

  return (
    <Button title="Đăng xuất" onPress={handleLogout} />
  );
};

export default LogoutButton;
