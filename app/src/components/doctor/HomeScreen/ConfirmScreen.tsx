import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/app/src/shared/Header';
import apiService from '@/app/src/services/apiService';

interface SelectedMedicine {
    _id: string;
    name: string;
    price: number;
}

interface MedicineDetail {
    medicine: SelectedMedicine;
    quantity: number;
}

interface AppointmentRecord {
    appointmentId: string;
    details: {
        medicineId: string;
        quantity: number;
    }[];
}

const ConfirmScreen = ({ route }: any) => {
    const { patientData, medicines } = route.params;
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [dataRecord, setDataRecord] = useState<any>(null); // Đảm bảo state là đúng kiểu dữ liệu
    const [loading, setLoading] = useState<boolean>(false);  // Để hiển thị trạng thái loading
    const [error, setError] = useState<string>('');  // Để lưu thông báo lỗi nếu có

    useEffect(() => {
        // Tính toán tổng tiền cho tất cả các thuốc
        const total = medicines.reduce((acc: number, item: any) => {
            return acc + item.medicine.price * item.quantity;
        }, 0);

        setTotalAmount(total);
    }, [medicines]);

    const handleSubmit = async () => {
        const record: AppointmentRecord = {
            appointmentId: patientData._id,
            details: medicines.map((item: MedicineDetail) => ({
                medicineId: item.medicine._id,  // Chuyển đổi thành medicineId cho server
                quantity: item.quantity
            }))
        };

        setDataRecord(record); // Cập nhật state
        console.log("Record to be sent:", JSON.stringify(record, null, 2));

        setLoading(true); // Bật loading khi đang gửi dữ liệu
        setError(''); // Reset lỗi trước khi gửi lại

        try {
            const response = await apiService.postRecordByDoctor(record); // Gửi bản ghi
            console.log("Lưu hồ sơ khám thành công:", response.data);
            setLoading(false); // Tắt loading khi thành công
        } catch (error: any) {
            console.error("Lỗi khi lưu hồ sơ khám:", error.message);
            setError('Lỗi khi lưu hồ sơ khám: ' + error.message); // Hiển thị thông báo lỗi
            setLoading(false); // Tắt loading khi gặp lỗi
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.medicineItem}>
            <Text style={styles.medicineName}>{item.medicine.name}</Text>
            <Text style={styles.medicineDetails}>
                Thành tiền: {item.medicine.price} VND
            </Text>
            <Text style={styles.medicineDetails}>
                Số lượng: {item.quantity}
            </Text>
            <Text style={styles.medicineDetails}>
                Tổng tiền: {item.medicine.price * item.quantity} VND
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Xác nhận đơn khám" showBackButton={false} />
            <View style={styles.containerItem}>
                <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>Bệnh nhân: {patientData.fullname}</Text>
                    <Text style={styles.patientInfoText}>{patientData.phoneNumber}</Text>
                    <Text style={styles.patientInfoText}>{patientData.email}</Text>
                    <Text style={styles.servicesTitle}>Dịch vụ:</Text>
                    {patientData.package.services.map((service: string, index: number) => (
                        <Text key={index} style={styles.serviceItem}>
                            - {service}
                        </Text>
                    ))}
                </View>

                <View style={styles.medicinesContainer}>
                    <Text style={styles.medicinesTitle}>Thuốc đã chọn:</Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            Tổng tiền tất cả thuốc: {totalAmount} VND
                        </Text>
                    </View>
                    <FlatList
                        style={styles.listView}
                        data={medicines}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.medicine._id}
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
            </View>

            {loading ? (
                <Text style={styles.loadingText}>Đang gửi dữ liệu...</Text>
            ) : (
                <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                    <Text style={styles.txtButton}> Xác nhận </Text>
                </TouchableOpacity>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerItem: {
        paddingHorizontal: 10,
    },
    patientInfo: {
        marginBottom: 20,
    },
    patientName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    patientInfoText: {
        fontSize: 16,
        color: '#555',
    },
    servicesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    listView: {},
    flatListContent: {
        paddingBottom: 15,
    },
    serviceItem: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    medicinesContainer: {
        marginTop: 20,
        maxHeight: '70%',
    },
    medicinesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    medicineItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    medicineName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medicineDetails: {
        fontSize: 16,
        color: '#333',
    },
    totalContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    confirmButton: {
        justifyContent: 'center',
        padding: 15,
        alignSelf: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 20,
        backgroundColor: '#5CB15A',
    },
    txtButton: {
        color: 'white',
        fontSize: 17,
    },
    loadingText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
