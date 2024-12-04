import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Header from '@/app/src/shared/Header';
import apiService from '@/app/src/services/apiService';
import Item_List_Medicine from './Item_List_Medicine';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

interface Medicine {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    hospital: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface MedicineDetails {
    medicineId: Medicine;
    quantity: number;
    _id: string;
}

interface Record {
    _id: string;
    appointment: string;
    details: MedicineDetails[];
}

const History_Detail = ({ route }: any) => {
    const { item, index } = route.params;
    const [medicineDetail, setMedicineDetail] = useState<MedicineDetails[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation<any>(); // Hook to access navigation

    const appointmentId = item._id;

    const getRecordByAppointment = async () => {
        try {
            const response = await apiService.getRecordByAppointment(appointmentId);
            console.log("Dữ liệu từ API:", JSON.stringify(response.data, null, 2));

            const details = response.data && response.data[0] ? response.data[0].details : null;

            if (details) {
                console.log("Chi tiết thuốc:", JSON.stringify(details, null, 2));
                setMedicineDetail(details);
            } else {
                console.log("Không có details trong dữ liệu trả về.");
            }
        } catch (error) {
            console.log("Lỗi khi lấy record:", error);
        }
    };

    useEffect(() => {
        if (appointmentId) {
            getRecordByAppointment();
        }
    }, [appointmentId]);

    // Function to calculate total price of medicines
    const calculateMedicineTotal = () => {
        if (!medicineDetail) return 0;

        return medicineDetail.reduce((total, item) => {
            return total + item.medicineId.price * item.quantity;
        }, 0);
    };

    // Calculate the total including the package price
    const calculateTotal = () => {
        const medicineTotal = calculateMedicineTotal();
        const packagePrice = item.package.price;
        return medicineTotal + packagePrice;
    };

    const handlePayment = () => {
        // Navigate to the Payment Method screen and pass data
        navigation.navigate('payment_method_screen', {
            totalPrice: calculateTotal(),
            appointmentId: appointmentId,
        });
    };

    return (
        <View style={styles.container}>
            <Header title="Chi tiết lịch khám" showBackButton={true} />
            <View style={styles.content}>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>ID: </Text>
                    {index + 1}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Ngày: </Text>
                    {moment(item.date).format('DD-MM-YYYY')}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Giờ: </Text>
                    {item.time}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Tên bệnh nhân: </Text>
                    {item.patient?.fullname || item.fullname || 'Đang cập nhật'}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Tên bác sĩ: </Text>
                    {item.doctor?.fullname || 'Đang cập nhật'}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Trạng thái: </Text>
                    {item.status?.name || 'Đang cập nhật'}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Ghi chú của bác sĩ: </Text>
                    {item.reason || 'Không có ghi chú'}
                </Text>
                <Text style={styles.sectionTitle}>{item.package.name} {item.package.price} VND</Text>
                <FlatList
                    data={item.package.services}
                    renderItem={({ item }) => (
                        <View>
                            <Text>- {item}</Text>
                        </View>
                    )}
                />

                {/* Hiển thị chi tiết thuốc */}
                <Text style={styles.sectionTitle}>Chi tiết thuốc:</Text>
                {medicineDetail ? (
                    <FlatList
                        data={medicineDetail}
                        renderItem={({ item }) => (
                            <Item_List_Medicine
                                item={item} // Truyền thông tin thuốc từ medicineId
                            />
                        )}
                        keyExtractor={(item) => item._id.toString()}
                    />
                ) : (
                    <Text>Không có thông tin chi tiết thuốc.</Text>
                )}

                {/* Hiển thị tổng tiền thuốc và tổng tiền toàn bộ */}
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Tổng tiền thuốc: </Text>
                    {calculateMedicineTotal()} VND
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Tổng tiền (bao gồm gói khám): </Text>
                    {calculateTotal()} VND
                </Text>
                {
                    item.status.name == 'đã khám' ? <TouchableOpacity
                        style={[styles.bookButton, loading ? styles.loadingButton : styles.normalButton]} // Thay đổi style tùy thuộc vào loading
                        onPress={handlePayment} // Handle payment button press
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.bookButtonText}>Thanh toán</Text>
                        )}
                    </TouchableOpacity> : <></>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    bookButton: {
        backgroundColor: '#489458',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    loadingButton: {
        marginVertical: 10, // Đặt margin cho button khi loading
    },
    normalButton: {
        marginVertical: 20, // Đặt margin cho button khi không loading
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default History_Detail;
