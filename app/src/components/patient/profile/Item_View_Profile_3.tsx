import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Import FontAwesome for icons
import Logout from '@/app/src/shared/Logout';
import { useUser, useClerk } from '@clerk/clerk-expo'; // Import useUser and useClerk for user management
import { useRouter } from 'expo-router';

const Item_View_Profile_3 = (data: any) => {
    const navigation = useNavigation();
    const router = useRouter();

    const { user } = useUser(); // Lấy thông tin người dùng từ Clerk
    const clerk = useClerk(); // Khởi tạo clerk

    const handleLogout = () => {
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
                    onPress: () => {
                        clerk.signOut(); // Gọi hàm đăng xuất từ Clerk
                        Alert.alert('Đăng xuất thành công');
    
                        router.canGoBack;
                        router.replace('/(public)'); // Thay thế màn hình hiện tại bằng màn hình login
                    },
                },
            ],
            { cancelable: false }
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.option}>
                    <FontAwesome name="file-text" size={20} color="black" style={styles.icon} />
                    <Text style={styles.text1}>
                        Điều khoản dịch vụ
                    </Text>
                </TouchableOpacity>
                {user ? (
                    <TouchableOpacity style={styles.option} onPress={ handleLogout }>
                        <FontAwesome name="user-times" size={20} color="black" style={styles.icon} />
                        <Text style={styles.text1}>Đăng xuất</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.option}>
                        <FontAwesome name="user-times" size={20} color="black" style={styles.icon} />
                        <Logout />
                    </View>
                )}
            </View>
        </View>
    );
}

export default Item_View_Profile_3;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    options: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa biểu tượng và văn bản
        marginVertical: 10, // Khoảng cách giữa các tùy chọn
    },
    icon: {
        marginRight: 10, // Khoảng cách giữa biểu tượng và văn bản
    },
    text1: {
        color: 'black',
    },
});
