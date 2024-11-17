import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../Header';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    const { user } = useAuth();

    const idUser = user?.user?.id;
    const route = useRoute();
    const { dataUser }: any = route.params || {};
    const roleName = dataUser?.role?.name;

    const handleChangePassword = async () => {
        if (!oldPassword) {
            Alert.alert('Thiếu mật khẩu cũ', 'Vui lòng nhập mật khẩu cũ của bạn.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Mật khẩu không khớp', 'Vui lòng kiểm tra lại mật khẩu của bạn.');
            return;
        }

        try {
            // Pass both oldPassword and newPassword to the updateAccount method
            const response = await authService.updateAccount(idUser, oldPassword, password, roleName);

            if (response.message === 'Password changed successfully') {
                Alert.alert('Thành công', 'Mật khẩu đã được thay đổi.');
                navigation.goBack();
            } else {
                Alert.alert('Lỗi', response.message || 'Không thể thay đổi mật khẩu');
            }
        } catch (error: any) {
            console.error('Lỗi thay đổi mật khẩu:', error.response?.data);
            Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu');
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Thay đổi mật khẩu" showBackButton={false} />
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu cũ"
                    placeholderTextColor={"#888888"}
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    placeholderTextColor={"#888888"}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor={"#888888"}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
                    <Text style={styles.txtBtn}>
                        Đổi mật khẩu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    btn: {
        alignItems: 'center',
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#5CB15A',
        borderRadius: 20,
        margin: 20

    },
    txtBtn: {
        color: 'white'
    }
});

export default ChangePassword;
