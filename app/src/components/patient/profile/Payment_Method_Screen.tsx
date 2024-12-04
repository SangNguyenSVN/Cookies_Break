import Header from '@/app/src/shared/Header';
import SubHeading from '@/app/src/shared/SubHeading';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Payment_Method_Screen = ({ route, navigation }: any) => {
    // Lấy thông tin từ route.params
    const { totalPrice, appointmentId } = route.params;

    const handlePayment = () => {
        // Xử lý thanh toán (ví dụ, gọi API thanh toán)
        console.log('Thực hiện thanh toán cho lịch hẹn:', appointmentId);
    };

    return (
        <View style={styles.container}>
            <Header title='Thanh toán' showBackButton={false} />
            <View style={styles.box}>
                <Text style={styles.text}>Mã lịch hẹn: {appointmentId}</Text>
                <Text style={styles.text}>Tổng tiền: {totalPrice} VND</Text>
            </View>
            <View style={styles.select}>
                <SubHeading title='Chọn phương thức thanh toán'/>
                
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
    select:{
        margin: 20,

    }
});

export default Payment_Method_Screen;
