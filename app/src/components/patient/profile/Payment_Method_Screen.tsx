import Header from '@/app/src/shared/Header';
import SubHeading from '@/app/src/shared/SubHeading';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/app/src/hooks/useAuth';
import apiService from '@/app/src/services/apiService';
const Payment_Method_Screen = ({ route, navigation }: any) => {
    // Lấy thông tin từ route.params
    const { totalPrice, appointmentId } = route.params;
    const {user} = useAuth()
    const handlePayment = async () => {
        try {
            const response = await apiService.createPayment()
            const approvalUrl = response.data.approvalUrl;

            if (approvalUrl) {
                window.location.href = approvalUrl; 
            } else {
                Alert.alert('Lỗi', 'Không nhận được URL chuyển hướng.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo thanh toán.');
        } finally {
        }
    };

    const data = [
        {
            id: 1,
            name: 'Paypal',
            color: '#0070ba',  // Màu nền của Paypal
        },
        {
            id: 2,
            name: 'Momo',
            color: '#fba400',  // Màu nền của Momo
        }
    ];

    return (
        <View style={styles.container}>
            <Header title='Thanh toán' showBackButton={false} />
            <View style={styles.box}>
                <Text style={styles.text}>Mã lịch hẹn: {appointmentId}</Text>
                <Text style={styles.text}>Tổng tiền: {totalPrice} VND</Text>
            </View>
            <View style={styles.select}>
                <SubHeading title='Chọn phương thức thanh toán' />
                <View style={styles.options}>
                    {data.map((item) => (
                        <TouchableOpacity
                            onPress={handlePayment}
                            key={item.id}
                            style={[styles.touch, { backgroundColor: item.color }]}
                        >
                            <Text style={styles.textButton}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        padding: 5,
    },
    box: {
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10
    },
    select: {
        margin: 20,
    },
    options: {
        flexDirection: 'row',
        gap: 10,
    },
    touch: {
        height: 50,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black',
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Payment_Method_Screen;
