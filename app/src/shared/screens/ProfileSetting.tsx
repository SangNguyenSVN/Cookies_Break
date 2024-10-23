import { StyleSheet, View, Text, TextInput, TouchableOpacity,Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../../shared/Header';
import DOB_Picker from '../DOB_Picker';
import { useNavigation } from '@react-navigation/native';
import apiPatient from '../../services/apiPatient';

const ProfileSetting = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState<Date>(new Date());
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const route = useRoute();
    const navigation = useNavigation();


    const [error, setError] = useState({
        name: false,
        dob: false,
        address: false,
        phoneNumber: false,
        email: false,
    });
    const { dataUser }: any = route.params || {};
    const data = dataUser?.data;


    // console.log('Dữ liệu người dùng:', dataUser); // Log toàn bộ dataUser
    // console.log('Dữ liệu:', data); // Log dữ liệu bên trong data

    if (data) {
        // console.log('User:', data.user); // Log thông tin người dùng
        // console.log('Role:', data.role);   // Log thông tin vai trò
    }

    // Initialize fields with user data
    useEffect(() => {
        if (data) {
            setName(data.user.fullname || '');
            setDob(new Date(data.user.dateOfBirth) || new Date());
            setGender(data.user.gender || '');
            setAddress(data.user.address || '');
            setPhoneNumber(data.user.phoneNumber || '');
            setEmail(data.user.email || '');
        }
    }, [route.params]);

    // Handle name change
    const handleNameChange = (text: string) => {
        setName(text);
        setError(prev => ({ ...prev, name: !text }));
    };

    const handleAddressChange = (text: string) => {
        setAddress(text);
        setError(prev => ({ ...prev, address: !text }));
    };

    const handlePhoneChange = (text: string) => {
        setPhoneNumber(text);
        setError(prev => ({ ...prev, phoneNumber: !text }));
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setError(prev => ({ ...prev, email: !text })); // Kiểm tra nếu trống
    };

    const handleUpdate = async () => {
        const newError = {
            name: !name,
            dob: !dob,
            address: !address,
            phoneNumber: !phoneNumber,
            email: !email,
        };

        setError(newError); // Cập nhật trạng thái lỗi

        // Kiểm tra xem có lỗi nào không
        if (Object.values(newError).some(error => error)) {
            console.log('Có lỗi trong các trường nhập.');
            return; // Dừng thực hiện nếu có lỗi
        }

        try {
            // Gọi hàm cập nhật với dữ liệu mới
            const updatedData = {
                phoneNumber: phoneNumber,
                email: email,
                gender: gender,
                dateOfBirth: dob,
                fullname: name,
                address: address,
            };
            const response = await apiPatient.updatePatient(updatedData);
            console.log('Cập nhật thành công:', response.message);
            Alert.alert('Cập nhật thành công thành công');
            navigation.goBack();

            // Bạn có thể hiển thị thông báo cho người dùng tại đây

        } catch (error: any) {
            console.error('Cập nhật thất bại:', error.message);
            // Bạn có thể hiển thị thông báo lỗi cho người dùng tại đây
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust behavior for iOS and Android
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View>
                        <Header title="Thông tin tài khoản" showBackButton={false} />
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.profilePicture}>
                            <View style={styles.avatarPlaceholder} />
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.label}>Tên đầy đủ:</Text>
                            <TextInput
                                style={[styles.input, error.name && styles.errorInput]}
                                placeholder="Nhập tên đầy đủ"
                                value={name}
                                onChangeText={handleNameChange}
                            />

                            <Text style={styles.label}>Ngày sinh:</Text>
                            <DOB_Picker dob={dob} setDob={setDob} />


                            <Text style={styles.label}>Giới tính:</Text>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity
                                    style={[styles.genderOption, (gender === 'Nam' || data.gender === 'Nam') && styles.activeGender]}
                                    onPress={() => setGender('Nam')}
                                >
                                    <Text style={styles.genderText}>Nam</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.genderOption, (gender === 'Nữ' || data.gender === 'Nữ') && styles.activeGender]}
                                    onPress={() => setGender('Nữ')}
                                >
                                    <Text style={styles.genderText}>Nữ</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.label}>Địa chỉ:</Text>
                            <TextInput
                                style={[styles.input, error.address && styles.errorInput]}
                                placeholder="Số nhà - đường - thôn - xóm"
                                value={address}
                                onChangeText={handleAddressChange}
                            />

                            <Text style={styles.label}>Số điện thoại:</Text>
                            <TextInput
                                style={[styles.input, error.phoneNumber && styles.errorInput]}
                                value={phoneNumber}
                                onChangeText={handlePhoneChange}
                                keyboardType="phone-pad"
                            />

                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={[styles.input, error.email && styles.errorInput]}
                                placeholder="VD : abc@gmail.com"
                                value={email}
                                onChangeText={handleEmailChange}
                                keyboardType="email-address"
                            />
                        </View>
                    </ScrollView>
                </View>

            </TouchableWithoutFeedback>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Cập nhật</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default ProfileSetting;

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
    errorInput: {
        borderColor: 'red', // Màu viền đỏ khi có lỗi
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
