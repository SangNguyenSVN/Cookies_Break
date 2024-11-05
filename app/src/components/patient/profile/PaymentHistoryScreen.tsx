// PaymentHistoryScreen.tsx
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PaymentHistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch sử thanh toán</Text>
            {/* Thêm nội dung chi tiết lịch sử thanh toán ở đây */}
        </View>
    );
};

export default PaymentHistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
