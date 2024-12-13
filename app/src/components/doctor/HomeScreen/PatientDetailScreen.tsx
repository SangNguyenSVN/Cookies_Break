import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Header from '../../../shared/Header';
import moment from 'moment';
import apiService from '@/app/src/services/apiService';

const PatientDetailScreen = ({ route, navigation }: any) => {
    const { patientData } = route.params; // Nhận dữ liệu bệnh nhân từ tham số điều hướng
    // console.log(patientData)
    const [reason, setReason] = useState(patientData.reason); // Trạng thái cho lý do
    const [status, setStatus] = useState(patientData.status.name); // Trạng thái cho đơn khám
    const idAppointment = patientData._id
    const handlePress = async () => {
        const idAppointment = patientData._id
        const statusName = 'đã khám'
        try {
            await apiService.putAppointmentStatus(idAppointment, statusName, reason);
            navigation.navigate('medicine_selection_screen', { patientData });
        } catch (erorr) {
            console.log("loi khi xac nhan lich kham")
        }
    };

    const handleCancel = () => {
        // Kiểm tra xem lý do có được nhập không
        if (!reason.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập lý do hủy đơn khám.');
            return;
        }

        // Hiển thị Alert xác nhận trước khi hủy
        Alert.alert(
            'Xác nhận', // Tiêu đề
            'Bạn có chắc chắn muốn hủy đơn khám này không?', // Nội dung
            [
                {
                    text: 'Hủy bỏ', // Nút từ chối
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý', // Nút đồng ý
                    onPress: async () => {
                       
                        const statusName = 'đã hủy'
                        try {
                            await apiService.putAppointmentStatus(idAppointment, statusName, reason);
                            Alert.alert('Thông báo', 'Đơn khám đã bị hủy.', [
                                { text: 'OK', onPress: () => navigation.goBack() },
                            ]);
                        } catch (error: any) {
                            console.log("loi khi huy lich kham",error.message)
                        }

                    },
                },
            ]
        );
    };




    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Header title='Thông tin bệnh nhân' showBackButton={true} />

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.content}>
                            <Text style={styles.label}>Tên bệnh nhân:</Text>
                            <Text style={styles.value}>{patientData.fullname}</Text>

                            <Text style={styles.label}>Thời gian hẹn:</Text>
                            <Text style={styles.value}> {patientData.time} | {moment(patientData.date).format('YYYY-MM-DD')}</Text>

                            <Text style={styles.label}>Trạng thái:</Text>
                            <Text style={[styles.value, { fontWeight: 'bold', color: getStatusColor(status) }]}>{status}</Text>

                            <Text style={styles.label}>Ghi chú từ bệnh nhân:</Text>
                            <Text style={styles.input}>{patientData.notes}</Text>

                            <Text style={styles.label}>Ghi chú từ bác sĩ:</Text>
                            <TextInput
                                style={styles.input}
                                value={reason}
                                onChangeText={setReason}
                                multiline
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Từ chối</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handlePress}>
                                    <Text style={styles.buttonText}>Chấp nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

// Helper function to get color based on status
const getStatusColor = (status: string) => {
    switch (status) {
        case 'đã hủy':
            return 'red';
        case 'chờ khám':
            return 'orange';
        case 'đã khám':
            return 'green';
        default:
            return 'black';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContainer: {
        padding: 10
    },
    content: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 20, // Khoảng cách dưới cùng
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 80,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        backgroundColor: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonView: {
        marginVertical: 30, // Optional: Add some vertical spacing
    },
    button: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    confirmButton: {
        backgroundColor: '#5CB15A',
    },
    cancelButton: {
        backgroundColor: '#FC7070',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default PatientDetailScreen;
