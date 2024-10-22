import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../../shared/Header';
import DOB_Picker from '../DOB_Picker';
import { useNavigation } from '@react-navigation/native';
import apiPatient from '../../services/apiPatient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu UpdatePatientInput
interface UpdatePatientInput {
    username?: string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string ;
    fullname?: string;
    address?: string;
    imageUrl?: string ;
}

const ProfileSetting = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState<Date>(new Date());
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [imageUri, setImageUri] = useState<string>();
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

    // Initialize fields with user data
    useEffect(() => {
        if (dataUser) {
            setName(dataUser.user.fullname || '');
            setDob(new Date(dataUser.user.dateOfBirth) || new Date());
            setGender(dataUser.user.gender || '');
            setAddress(dataUser.user.address || '');
            setPhoneNumber(dataUser.user.phoneNumber || '');
            setEmail(dataUser.user.email || '');
            setImageUri(dataUser.user.imageUri || null);
        }
    }, [route.params]);

    // Handle image selection
    const handleImageSelect = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert('Permission to access camera roll is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error selecting image:", error);
        }
    };

    // Handle input changes
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
        setError(prev => ({ ...prev, email: !text }));
    };

    const handleUpdate = async () => {
        const newError = {
            name: !name,
            dob: !dob,
            address: !address,
            phoneNumber: !phoneNumber,
            email: !email,
        };

        setError(newError);

        if (Object.values(newError).some(error => error)) {
            console.log('Có lỗi trong các trường nhập.');
            return;
        }

        try {
            const updatedData: UpdatePatientInput = {
                phoneNumber,
                email,
                gender,
                dateOfBirth: dob ? dob.toISOString() : undefined,
                fullname: name,
                address,
                imageUrl: imageUri || undefined,
            };
            const response = await apiPatient.updatePatient(updatedData, imageUri);
            console.log('Cập nhật thành công:', response.message);
            Alert.alert('Cập nhật thành công');
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            navigation.goBack();
        } catch (error: any) {
            console.error('Cập nhật thất bại:', error.message);
            Alert.alert('Cập nhật thất bại', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Header title="Thông tin tài khoản" showBackButton={false} />
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.profilePicture}>
                            <TouchableOpacity onPress={handleImageSelect}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={styles.avatar} />
                                ) : (
                                    <View style={styles.avatarPlaceholder} />
                                )}
                            </TouchableOpacity>
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
                                    style={[styles.genderOption, (gender === 'Nam') && styles.activeGender]}
                                    onPress={() => setGender('Nam')}
                                >
                                    <Text style={styles.genderText}>Nam</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.genderOption, (gender === 'Nữ') && styles.activeGender]}
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
    avatar: {
        width: 80,
        height: 80,
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
        borderColor: 'red',
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
        paddingVertical: 15,
        margin: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
