import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../services/apiClient';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Mật khẩu không khớp', 'Vui lòng kiểm tra lại mật khẩu của bạn.');
            return;
        }

        try {
            const response = await apiClient.put('/auth/account/update', { password });
            Alert.alert('Thành công', response.data.message);
            navigation.goBack(); // Quay lại màn hình trước
        } catch (error: any) {
            console.error('Lỗi thay đổi mật khẩu:', error.response?.data);
            Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Thay đổi mật khẩu" onPress={handleChangePassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default ChangePassword;
