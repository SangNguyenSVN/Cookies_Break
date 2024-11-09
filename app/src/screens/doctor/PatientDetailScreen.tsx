import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Header from '../../shared/Header';
import moment from 'moment'; 

const PatientDetailScreen = ({ route, navigation }: any) => {
    const { patientData } = route.params; // Nhận dữ liệu bệnh nhân từ tham số điều hướng

    const [note, setNote] = useState(patientData.note); // Trạng thái cho thông tin khám
    const [reason, setReason] = useState(patientData.reason); // Trạng thái cho lý do
    const [status, setStatus] = useState(patientData.status.name); // Trạng thái cho đơn khám

    const handlePress = () => {
        navigation.navigate('medicine_selection_screen', {patientData});
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

                            <Text style={styles.label}>Thông tin khám:</Text>
                            <TextInput
                                style={styles.input}
                                value={note}
                                onChangeText={setNote}
                                multiline
                            />

                            <Text style={styles.label}>Lý do từ chối (nếu có):</Text>
                            <TextInput
                                style={styles.input}
                                value={reason}
                                onChangeText={setReason}
                                multiline
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                                    <Text style={styles.buttonText}>Xác nhận đơn khám</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Hủy đơn khám</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handlePress}>
                                    <Text style={styles.buttonText}>Chọn thuốc</Text>
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
        paddingBottom: 20, // Khoảng cách dưới cùng
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
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
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
