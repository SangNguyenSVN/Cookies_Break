import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../../shared/Header';

const PatientDetailScreen = ({ route, navigation }: any) => {
    const { patientData } = route.params; // Nhận dữ liệu bệnh nhân từ tham số điều hướng
 
    const [note, setNote] = useState(patientData.note); // Trạng thái cho thông tin khám
    const [reason, setReason] = useState(patientData.reason); // Trạng thái cho lý do
    const [status, setStatus] = useState(patientData.status); // Trạng thái cho đơn khám
    const handlePress = () => {
      navigation.navigate('medicine_selection_screen', {}); 
    };

    const handleConfirm = () => {
        setStatus('Chờ'); // Chuyển trạng thái thành "Chờ"
        Alert.alert('Thông báo', 'Đơn khám đã được xác nhận.', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    const handleCancel = () => {
        // Kiểm tra xem lý do có được nhập không
        if (!reason.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập lý do hủy đơn khám.');
            return;
        }

        // Nếu lý do có chữ, cập nhật trạng thái thành "Đã hủy"
        if (reason.trim()) {
            setStatus('Đã hủy'); // Cập nhật trạng thái thành "Đã hủy"
            Alert.alert('Thông báo', 'Đơn khám đã bị hủy.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }
    };

    return (
        <><Header title='Thông tin bệnh nhân' showBackButton={true} />
        <View style={styles.container}>

            <Text style={styles.label}>Tên bệnh nhân:</Text>
            <Text style={styles.value}>{patientData.patientName}</Text>

            <Text style={styles.label}>Thời gian hẹn:</Text>
            <Text style={styles.value}>{patientData.appointmentTime}</Text>

            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={[styles.value, { fontWeight: 'bold', color: getStatusColor(status) }]}>{status}</Text>

            <Text style={styles.label}>Thông tin khám:</Text>
            <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
                multiline />

            <Text style={styles.label}>Lý do từ chối (nếu có):</Text>
            <TextInput
                style={styles.input}
                value={reason}
                onChangeText={setReason}
                multiline />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Xác nhận đơn khám</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Hủy đơn khám</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handlePress}>
                    <Text style={styles.buttonText}>Chon thuoc</Text>
                </TouchableOpacity>
            </View>
        </View></>
    );
};

// Helper function to get color based on status
const getStatusColor = (status) => {
    switch (status) {
        case 'Đã hủy':
            return 'red';
        case 'Chờ':
            return 'orange';
        case 'Đã xác nhận':
            return 'green';
        default:
            return 'black';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        height: 80, // Chiều cao để dễ nhập liệu hơn
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        textAlignVertical: 'top', // Để văn bản bắt đầu từ đầu ô nhập
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    confirmButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PatientDetailScreen;
