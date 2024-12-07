import Header from '@/app/src/shared/Header';
import SubHeading from '@/app/src/shared/SubHeading';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
import { useAuth } from '@/app/src/hooks/useAuth';
import apiService from '@/app/src/services/apiService';
import axios from 'axios';

const Payment_Method_Screen = ({ route, navigation }: any) => {
    // Lấy thông tin từ route.params
    const { totalPrice, appointmentId } = route.params;
    const { user } = useAuth();

    // Trạng thái loading cho từng phương thức thanh toán
    const [loadingMethod, setLoadingMethod] = useState<number | null>(null);
    const [usdPrice, setUsdPrice] = useState<number | null>(null); // Lưu giá tiền bằng USD
    const [loadingCurrency, setLoadingCurrency] = useState<boolean>(false); // Trạng thái loading cho tỉ giá

    useEffect(() => {
        // Gọi API để lấy tỉ giá USD
        const fetchExchangeRate = async () => {
            setLoadingCurrency(true);  // Bắt đầu loading
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/VND'); // Ví dụ API tỉ giá
                const exchangeRate = response.data.rates.USD; // Lấy tỉ giá USD
                const usdAmount = totalPrice * exchangeRate;
                setUsdPrice(usdAmount); // Cập nhật giá tiền bằng USD
                console.log('Tỷ giá hiện tại:', exchangeRate);
                console.log('Tổng tiền VND:', totalPrice);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
                Alert.alert('Lỗi', 'Không thể lấy tỉ giá');
            } finally {
                setLoadingCurrency(false);  // Kết thúc loading
            }
        };

        fetchExchangeRate();
    }, [totalPrice]); // Gọi lại khi totalPrice thay đổi

    const handlePayment = async (paymentMethod: string, methodId: number) => {
        try {
            setLoadingMethod(methodId); // Bắt đầu quá trình thanh toán cho phương thức này, hiển thị loading

            console.log(user);
            const paymentData: any = {
                userId: user?.user?.id,
                appointmentId,
                total: usdPrice,
                currency: 'USD',  
                method: paymentMethod 
            };

            const response = await apiService.createPayment(paymentData);
            const approvalUrl = response.data.approvalUrl;  // Giả sử API trả về approvalUrl

            if (approvalUrl) {
                // Mở URL thanh toán trực tiếp trong trình duyệt
                Linking.openURL(approvalUrl)
                    .catch((err) => Alert.alert('Lỗi', 'Không thể mở URL thanh toán.'));
            } else {
                Alert.alert('Lỗi', 'Không nhận được URL chuyển hướng.');
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo thanh toán.');
        } finally {
            setLoadingMethod(null); // Kết thúc quá trình thanh toán, ẩn loading
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

                {/* Hiển thị giá tiền bằng USD nếu có */}
                {loadingCurrency ? (
                    <ActivityIndicator size="small" color="black" />
                ) : (
                    <Text style={styles.text}>Tương đương: {usdPrice?.toFixed(2)} USD</Text>
                )}
            </View>
            <View style={styles.select}>
                <SubHeading title='Chọn phương thức thanh toán' />
                <View style={styles.options}>
                    {data.map((item) => (
                        <TouchableOpacity
                            onPress={() => handlePayment(item.name, item.id)}
                            key={item.id}
                            style={[styles.touch, { backgroundColor: item.color }]}
                            disabled={loadingMethod !== null} // Disable tất cả các button khi đang load
                        >
                            {loadingMethod === item.id ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.textButton}>{item.name}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {loadingMethod !== null && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0070ba" />
                    <Text style={styles.loadingText}>Đang xử lý thanh toán...</Text>
                </View>
            )}
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
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -75 }, { translateY: -25 }],
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default Payment_Method_Screen;
