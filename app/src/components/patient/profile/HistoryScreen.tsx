// HistoryScreen.tsx
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch sử khám</Text>
            {/* Thêm nội dung chi tiết lịch sử khám ở đây */}
        </View>
    );
};

export default HistoryScreen;

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
