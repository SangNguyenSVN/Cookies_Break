import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';



const Item_List_Appointment= ({ item, index }: any) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemId}>ID {index + 1}</Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Ngày: </Text>
                {moment(item.date).format('DD-MM-YYYY')}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Giờ: </Text>
                {item.time}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Tên bệnh nhân: </Text>
                {item.patient?.fullname || item.fullname || 'Đang cập nhật'}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Tên bác sĩ: </Text>
                {item.doctor?.fullname || 'Đang cập nhật'}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Trạng thái: </Text>
                {item.status?.name || 'Đang cập nhật'}
            </Text>
        </View>
    );
};

export default Item_List_Appointment;

const styles = StyleSheet.create({
    item: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2,
    },
    itemId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 4,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
    },
});
