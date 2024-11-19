import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const PaymentHistoryScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [paymentHistory, setPaymentHistory] = useState([
        { id: '1', time: '2024-11-18 14:30', amount: '500,000 VND' },
        { id: '2', time: '2024-11-10 09:15', amount: '200,000 VND' },
        { id: '3', time: '2024-10-25 17:45', amount: '1,000,000 VND' },
        { id: '4', time: '2024-11-05 12:10', amount: '300,000 VND' },
        { id: '5', time: '2024-09-30 08:00', amount: '750,000 VND' },
    ]);

    // Hàm tìm kiếm theo thời gian hoặc số tiền
    const filteredPayments = paymentHistory.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
            item.time.toLowerCase().includes(query) || 
            item.amount.toLowerCase().includes(query)
        );
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('PaymentDetail', { payment: item })}
        >
            {/* Khi nhấn vào ID sẽ chuyển sang màn hình chi tiết thanh toán */}
            <Text style={styles.itemText}>
                {item.id}. {item.time}
            </Text>
            <Text style={styles.itemText}>{item.amount}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch sử thanh toán</Text>
            
            {/* Input tìm kiếm */}
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm theo thời gian hoặc số tiền"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {filteredPayments.length > 0 ? (
                <FlatList
                    data={filteredPayments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.noDataText}>Không có kết quả tìm kiếm</Text>
            )}
        </View>
    );
};

export default PaymentHistoryScreen;

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
    list: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
    },
});
