import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import authService from '../services/authService';
import { useRouter } from 'expo-router';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Hủy đăng xuất'),
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            await authService.logout(); // Gọi hàm logout từ authService
                            Alert.alert('Đăng xuất thành công');

                            // Dọn dẹp hoàn toàn ngăn chứa và điều hướng về màn hình đăng nhập
                            router.canGoBack;
                            router.replace('/(public)') // Thay thế màn hình hiện tại bằng màn hình login
                        } catch (error) {
                            console.error('Lỗi khi đăng xuất:', error); // Debug: In lỗi nếu có
                            Alert.alert('Đăng xuất thất bại', 'Vui lòng thử lại.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logoutText}> {/* Thêm style cho chữ */}
                    Đăng xuất
                </Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {

    },
    logoutText: {
        color: 'red', // Màu chữ đỏ
    },
});
export default Logout;
