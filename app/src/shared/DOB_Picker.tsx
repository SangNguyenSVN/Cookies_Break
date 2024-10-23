import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomDOBPicker = ({ dob, setDob }: any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setDob(date); // Cập nhật ngày sinh
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                <Text style={styles.dateText}>
                    {dob ? dob.toLocaleDateString() : 'Select Date of Birth'}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display='spinner'
                headerTextIOS="Ngày sinh" // Tùy chỉnh text cho iOS
                confirmTextIOS="Xác nhận" // Tùy chỉnh nút xác nhận cho iOS
                cancelTextIOS="Từ chối" // Tùy chỉnh nút hủy cho iOS
                customHeaderIOS={() => <Text style={styles.customHeader}>Chọn ngày sinh của bạn</Text>} // Tùy chỉnh header trên iOS
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        
    },
    dateButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    dateText: {
        fontSize: 16,
        color: '#555',
    },
    customHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default CustomDOBPicker;
