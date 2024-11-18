import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/app/src/shared/Header'
import apiService from '@/app/src/services/apiService'

interface SelectedMedicine {
    _id: string
    name: string
    price: number
}

interface MedicineDetail {
    medicine: SelectedMedicine
    quantity: number
    description: string
}


const ConfirmScreen = ({ route }: any) => {
    const { patientData, medicines } = route.params
    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [dataRecord, setDataRecord] = useState()

    useEffect(() => {
        // Log the received data to the console
        // console.log('Patient Data:', patientData)
        // console.log('Medicines:', medicines)
        // Calculate the total amount for all medicines
        const total = medicines.reduce((acc: number, item: MedicineDetail) => {
            return acc + item.medicine.price * item.quantity
        }, 0)

        setTotalAmount(total)
    }, [medicines])
    const handleSubmit = async () => {
        // Tạo bản ghi dataRecord
        const record: any = {
            appointmentId: patientData._id,
            details: medicines,
            amount: totalAmount,
            descriptions: "Ghi chú từ bác sĩ",
        };

        setDataRecord(record); // Cập nhật state

        try {
            const response = await apiService.postRecordByDoctor(record); // Gửi bản ghi
            console.log("Lưu hồ sơ khám thành công:", response.data);
        } catch (error: any) {
            console.log("Lỗi khi lưu hồ sơ khám:", error.message);
        }
    };

    // Render each item in the FlatList
    const renderItem = ({ item }: { item: MedicineDetail }) => (
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
    )

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
                        // Limit the list height
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                <Text style={styles.txtButton}> Xác nhận </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ConfirmScreen

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
    listView: {
    },
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
        maxHeight: '70%'
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
        backgroundColor: "#5CB15A"
    },
    txtButton: {
        color: 'white',
        fontSize: 17
    }
})
