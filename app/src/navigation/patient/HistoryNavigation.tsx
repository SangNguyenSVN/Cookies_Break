import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from '../../screens/patient/HistoryScreen';
import PaymentHistoryScreen from '../../components/patient/profile/PaymentHistoryScreen';
import PaymentDetailScreen from '../../components/patient/profile/PaymentDetailScreen';

const HistoryNavigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Màn hình chính của lịch sử */}
            <Stack.Screen name="History" component={HistoryScreen} />
            {/* Màn hình thanh toán của bệnh nhân */}
            <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
            {/* Màn hình chi tiết thanh toán */}
            <Stack.Screen name="PaymentDetail" component={PaymentDetailScreen} />
        </Stack.Navigator>
    );
};

export default HistoryNavigation;

const styles = StyleSheet.create({});
