import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PaymentDetailScreen = ({ route }) => {
    const { payment } = route.params;  // Lấy thông tin thanh toán từ params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chi tiết thanh toán</Text>
            <View style={styles.detail}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{payment.id}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Thời gian thanh toán:</Text>
                <Text style={styles.value}>{payment.time}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.label}>Số tiền thanh toán:</Text>
                <Text style={styles.value}>{payment.amount}</Text>
            </View>
        </View>
    );
};

export default PaymentDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
});
