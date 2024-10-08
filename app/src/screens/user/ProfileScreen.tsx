import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../../shared/Header';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('Nam');
    const [address, setAddress] = useState('');
    const [phoneNumber] = useState('0999999999');
    const [email, setEmail] = useState('');

    const handleUpdate = () => {
        console.log({ name, dob, gender, address, phoneNumber, email });
    };

    return (
        <View style={styles.container}>

            <Header title="Thông tin tài khoản" showBackButton={false} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profilePicture}>
                    <View style={styles.avatarPlaceholder} />
                </View>

                {/* Các trường thông tin */}
                <View style={styles.form}>
                    <Text style={styles.label}>Tên đầy đủ:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập tên đầy đủ"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Ngày sinh:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD : 01/01/2024"
                        value={dob}
                        onChangeText={setDob}
                    />

                    <Text style={styles.label}>Giới tính:</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderOption, gender === 'Nam' && styles.activeGender]}
                            onPress={() => setGender('Nam')}
                        >
                            <Text style={styles.genderText}>Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderOption, gender === 'Nữ' && styles.activeGender]}
                            onPress={() => setGender('Nữ')}
                        >
                            <Text style={styles.genderText}>Nữ</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Địa chỉ:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Số nhà - đường - thôn - xóm"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Text style={styles.label}>Số điện thoại:</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        editable={false}
                        selectTextOnFocus={false}
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD : abc@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
            </ScrollView>

            {/* Nút Cập nhật */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 80,
    },
    profilePicture: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#ccc',
        borderRadius: 40,
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    genderContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    genderOption: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    activeGender: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    genderText: {
        color: '#000',
    },
    updateButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
