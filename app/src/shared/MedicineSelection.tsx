import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MedicineSelectModal from '../components/doctor/HomeScreen/MedicineSelectModal';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu thuốc
interface SelectedMedicine {
    id: string;
    name: string;
    price: number;
}

interface MedicineDetail {
    medicine: SelectedMedicine;
    quantity: number;
}

const MedicineSelectionScreen = ({ route }: any) => {
    const { patientData } = route.params;
    const navigation = useNavigation<any>();  // Sử dụng useNavigation để điều hướng

    console.log(patientData);

    // Trạng thái để quản lý thuốc đã chọn, bao gồm cả số lượng
    const [handleMedicines, setHandleMedicines] = useState<MedicineDetail[]>([]);

    // Trạng thái để kiểm soát việc hiển thị modal
    const [isModalVisible, setModalVisible] = useState(false);

    // Hàm để lưu thuốc đã chọn từ modal
    const handleSelectMedicines = (medicines: SelectedMedicine[]) => {
        // Giả định mỗi thuốc chọn sẽ có số lượng mặc định là 1
        const medicineDetails = medicines.map((medicine) => ({
            medicine,
            quantity: 1, // Số lượng mặc định, bạn có thể thay đổi logic này
        }));
        setHandleMedicines(medicineDetails);
    };

    // Hàm để điều chỉnh số lượng thuốc
    const adjustQuantity = (id: string, adjustment: number) => {
        setHandleMedicines(prevMedicines =>
            prevMedicines.map(item =>
                item.medicine.id === id
                    ? { ...item, quantity: Math.max(item.quantity + adjustment, 1) } // Đảm bảo số lượng không nhỏ hơn 1
                    : item
            )
        );
    };

    // Hàm để thay đổi trực tiếp số lượng từ input
    const handleQuantityChange = (id: string, newQuantity: string) => {
        const quantity = parseInt(newQuantity);
        if (!isNaN(quantity) && quantity > 0) {
            setHandleMedicines(prevMedicines =>
                prevMedicines.map(item =>
                    item.medicine.id === id
                        ? { ...item, quantity }
                        : item
                )
            );
        }
    };
    const handleSubmit = () => {
        // Chuyển sang màn hình Xác nhận đơn thuốc và truyền dữ liệu patientData và handleMedicines
        navigation.navigate('ConfirmPrescription', {
            patientData,
            medicines: handleMedicines
        });
    }
    return (
        <View style={styles.container}>
            <Header title='Kê thuốc' showBackButton={false} />

            <View style={styles.form}>
                <View style={styles.patientInfo}>
                    <Text style={styles.sectionTitle}>Thông tin bệnh nhân</Text>
                    <Text>Tên: {patientData.fullname}</Text>
                </View>

                {/* Danh sách thuốc */}
                <View style={styles.medicineList}>
                    <Text style={styles.sectionTitle}>Danh sách thuốc</Text>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableText, styles.nameColumn]}>Tên thuốc</Text>
                        <Text style={[styles.tableText, styles.quantityColumn]}>Số lượng</Text>
                        <Text style={[styles.tableText, styles.priceColumn]}>Giá</Text>
                    </View>
                    <FlatList
                        data={handleMedicines}
                        keyExtractor={(item) => item.medicine.id}
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableText, styles.nameColumn]}>{item.medicine.name}</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => adjustQuantity(item.medicine.id, -1)}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={[styles.tableText, styles.quantityInput]}
                                        value={item.quantity.toString()}
                                        onChangeText={(text) => handleQuantityChange(item.medicine.id, text)}
                                        keyboardType="numeric"
                                    />
                                    <TouchableOpacity onPress={() => adjustQuantity(item.medicine.id, 1)}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.tableText, styles.priceColumn]}>{item.medicine.price * item.quantity}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0 }} onPress={() => setModalVisible(true)}>
                        <FontAwesome name="plus-circle" size={30} color="#5ca02a" />
                    </TouchableOpacity>
                </View>

                <MedicineSelectModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    selectMedicines={handleSelectMedicines} // Truyền hàm cập nhật thuốc đã chọn
                />

                {/* Nút xác nhận */}
                <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                    <Text style={styles.confirmButtonText}>Xác nhận đơn thuốc</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    form: { flex: 1, padding: 10 },
    patientInfo: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

    medicineList: { flex: 1 },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#5ca02a',
        padding: 10,
        borderRadius: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        alignItems: 'center',
    },
    tableText: { fontSize: 14 },
    nameColumn: { flex: 2 },
    quantityColumn: { flex: 1, textAlign: 'center' },
    priceColumn: { flex: 1.5, textAlign: 'right' },

    // Nút điều chỉnh số lượng
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    quantityButton: { fontSize: 20, width: 30, textAlign: 'center', padding: 5, backgroundColor: '#ddd', borderRadius: 5 },
    quantityInput: { width: 40, textAlign: 'center', fontSize: 14, borderWidth: 1, borderColor: '#ddd', padding: 5, marginHorizontal: 5 },

    confirmButton: {
        backgroundColor: '#5ca02a',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    confirmButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default MedicineSelectionScreen;
