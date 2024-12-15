import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Header from '../../shared/Header';
import { useAuth } from '../../hooks/useAuth';
import Item_View_Profile_1 from '../../components/patient/profile/Item_View_Profile_1';
import Item_View_Profile_2 from '../../components/patient/profile/Item_View_Profile_2';
import Item_View_Profile_3 from '../../components/patient/profile/Item_View_Profile_3';
import authService from '../../services/authService';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
    const [dataUser, setDataUser] = useState<[]>([]);  // Dữ liệu người dùng
    const [loading, setLoading] = useState<boolean>(false);  // Trạng thái loading
    const { user } = useAuth();
    const idUser = user?.user?.id;  // Lấy id người dùng từ auth

    console.log(idUser);  // Kiểm tra giá trị idUser trong console

    const getUser = async () => {
        if (!idUser) {
            // Nếu không có idUser, không gọi API
            console.log('ID không có, chờ thêm...');
            return;
        }

        setLoading(true);  // Bắt đầu tải dữ liệu
        try {
            const response = await authService.getUser(idUser);  // Gọi API
            setDataUser(response.data);  // Cập nhật dữ liệu người dùng
            console.log(response.data);  // Kiểm tra dữ liệu trả về
        } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
        } finally {
            setLoading(false);  // Dừng trạng thái loading
        }
    };

    // Gọi lại API mỗi lần màn hình này được focus lại
    useFocusEffect(
        useCallback(() => {
            getUser();  // Gọi API khi màn hình được focus
        }, [idUser])  // Hook sẽ chỉ chạy lại khi idUser thay đổi
    );

    return (
        <View style={styles.container}>
            <Header title="Thông tin tài khoản" showBackButton={false} />
            <ScrollView>
                <View style={styles.item}>
                    <Item_View_Profile_1 data={dataUser} />
                    <Item_View_Profile_2 data={user} />
                    <Item_View_Profile_3 />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#489458',
    },
    item: {
        marginHorizontal: 10,
        justifyContent: 'space-between',
        gap: 40,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default ProfileScreen;
