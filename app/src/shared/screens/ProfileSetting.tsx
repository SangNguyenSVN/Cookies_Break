import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../../shared/Header';
import DOB_Picker from '../DOB_Picker';
import { useNavigation } from '@react-navigation/native';
import apiPatient from '../../services/apiPatient';
import apiDoctor from '../../services/apiDoctor';
import * as ImagePicker from 'expo-image-picker';
import { getMimeType } from '../../services/mime';
import { validateName, validateEmail, validatePhoneNumber } from '../../services/Validated'; // Import các hàm xác thực
import { useAuth } from '../../hooks/useAuth';
// Định nghĩa kiểu UpdatePatientInput
interface UpdatePatientInput {
    username?: string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    fullname?: string;
    address?: string;
    image?: string;
}
interface UpdateDoctorInput {
    username?: string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    specialty?: string;
    fullname?: string;
    address?: string;
    image?: string;
}

const ProfileSetting = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState<Date>(new Date());
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('')
    const [imageUri, setImageUri] = useState<any>();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth()
    const idUser = user?.user?.id
    const route = useRoute();
    const navigation = useNavigation();

    const [error, setError] = useState({
        name: false,
        dob: false,
        address: false,
        phoneNumber: false,
        email: false,
        specialty: false, // Thêm trường lỗi cho specialty
    });

    const { dataUser }: any = route.params || {};
    const roleName = user?.role?.name;

    useEffect(() => {
        if (dataUser) {
            setName(dataUser.userInfo.fullname || '');
            setDob(new Date(dataUser.userInfo.dateOfBirth) || new Date());
            setGender(dataUser.userInfo.gender || '');
            setAddress(dataUser.userInfo.address || '');
            setPhoneNumber(dataUser.userInfo.phoneNumber || '');
            setSpecialty(dataUser.userInfo.specialty || ''); 
            setEmail(dataUser.userInfo.email || '');
            setImageUri(dataUser.userInfo.image || null);
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
                const selectedImageUri = result.assets[0].uri;
                setImageUri(selectedImageUri);
                // Sử dụng getMimeType để lấy loại MIME từ URI
                // const imageType = getMimeType(selectedImageUri);

                // console.log("Hình ảnh đã chọn:", selectedImageUri);
                // console.log("Loại MIME của hình ảnh:", imageType);

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

    const handleSpecialtyChange = (text: string) => {
        setSpecialty(text);
        setError(prev => ({ ...prev, specialty: !text }));
    };

    const handleUpdate = async () => {
        setLoading(true);

        const newError = {
            name: !validateName(name),
            dob: !dob,
            address: !address,
            phoneNumber: !validatePhoneNumber(phoneNumber),
            email: !validateEmail(email),
            specialty: roleName === 'doctor' ? !specialty : false, 
        };

        setError(newError);

        if (Object.values(newError).some(error => error)) {
            
            console.log('Có lỗi trong các trường nhập.', error);
            return;
        }

        try {
            // Kiểm tra và lấy loại MIME cho imageUri nếu có
            let imageType;
            if (imageUri) {
                imageType = getMimeType(imageUri);
            }

            const updatedData: UpdatePatientInput | UpdateDoctorInput = {
                phoneNumber,
                email,
                gender,
                dateOfBirth: dob.toISOString(),
                fullname: name,
                address,
                ...(roleName === 'doctor' && { specialty }), // Thêm specialty nếu là bác sĩ
            };

            // Gọi API update với dữ liệu cần thiết, bao gồm cả hình ảnh
            if (roleName === 'doctor') {
                const response = await apiDoctor.updateDoctor(idUser, updatedData, imageUri, imageType);
                console.log('Cập nhật thành công:', response);
            } else if (roleName == 'patient') {
                const response = await apiPatient.updatePatient(idUser, updatedData, imageUri, imageType);
                console.log('Cập nhật thành công:', response);
            }

            Alert.alert('Cập nhật thành công');
            navigation.goBack();
        } catch (error: any) {
            console.error('Cập nhật thất bại:', error.message);
            Alert.alert('Cập nhật thất bại', error.message);
        } finally {
            setLoading(false);
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

                            {roleName === 'doctor' && ( // Hiển thị ô nhập specialty chỉ nếu là bác sĩ
                                <>
                                    <Text style={styles.label}>Chuyên khoa:</Text>
                                    <TextInput
                                        style={[styles.input, error.specialty && styles.errorInput]}
                                        placeholder="Nhập chuyên khoa"
                                        value={specialty}
                                        onChangeText={handleSpecialtyChange}
                                    />
                                </>
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={handleUpdate}
                            disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" /> // Hiện loading spinner
                            ) : (
                                <Text style={styles.updateButtonText}>Cập nhật</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>


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
        borderRadius: 8,
    },
    updateButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
