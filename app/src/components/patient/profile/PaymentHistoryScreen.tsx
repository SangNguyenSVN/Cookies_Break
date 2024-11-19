import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '@/app/src/shared/Header';
import InputSearch from '@/app/src/shared/InputSearch';

const PaymentHistoryScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [paymentHistory, setPaymentHistory] = useState([
        { id: '1', date: '2024-11-18 ', time: '14:30', amount: '500,000 VND' },

    ]);

    // Hàm tìm kiếm theo thời gian hoặc số tiền
    const filteredPayments = paymentHistory.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
            item.time.toLowerCase().includes(query) ||
            item.amount.toLowerCase().includes(query)
        );
    });

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('user_detail_payment', { payment: item })}
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
            <Header title='Lịch sử thanh toán' showBackButton={false} />
            {/* Input tìm kiếm */}
            <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <View style={styles.viewlist}>
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
        </View>
    );
};

export default PaymentHistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    viewlist:{
        padding: 10
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
