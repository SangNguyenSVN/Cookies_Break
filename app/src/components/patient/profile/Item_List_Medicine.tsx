import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Item_List_Medicine = ({ item }: { item: any }) => {
    return (
        <View style={styles.medicineItem}>
            <Text style={styles.medicineName}>{item.medicineId?.name}</Text>
            <Text style={styles.medicineText}>Giá: {item.medicineId?.price} VND</Text>
            <Text style={styles.medicineText}>Số lượng: {item?.quantity}</Text>
            <Text style={styles.medicineText}>Tổng tiền: {item.medicineId?.price * item?.quantity} VND</Text>
        </View>
    );
};

export default Item_List_Medicine;

const styles = StyleSheet.create({
    medicineItem: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 1,
    },
    medicineName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    medicineText: {
        fontSize: 14,
        color: '#333',
    },
});
