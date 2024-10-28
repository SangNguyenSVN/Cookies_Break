import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MedicineSelectModal from '../components/doctor/HomeScreen/MedicineSelectModal';
import Header from './Header';

const MedicineSelectionScreen = ({ route }: any) => {
    // Mock dữ liệu bệnh nhân
    const { patientData } = route.params; // Nhận dữ liệu bệnh nhân từ tham số điều hướng

    console.log(patientData)
    // State lưu danh sách thuốc
    const [medicines, setMedicines] = useState([
        { id: '1', name: 'Metformin', quantity: 30, unit: 'viên', price: 5000 },
        { id: '2', name: 'Insulin', quantity: 10, unit: 'lọ', price: 200000 },
    ]);

    // State để lưu thông tin thuốc mới
    const [newMedicine, setNewMedicine] = useState({
        name: '',
        quantity: '',
        unit: '',
        price: '',
    });

    // State để kiểm soát modal
    const [isModalVisible, setModalVisible] = useState(false);



    // Hàm thêm thuốc mới vào danh sách
    const addMedicine = () => {
        
    };

    // Hàm để lọc thuốc dựa trên tìm kiếm
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(newMedicine.name.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Header title='' showBackButton={true} />

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
                        <Text style={[styles.tableText, styles.unitColumn]}>Đơn vị</Text>
                        <Text style={[styles.tableText, styles.priceColumn]}>Số tiền</Text>
                        <Text style={[styles.tableText, styles.totalColumn]}>Thành tiền</Text>
                    </View>
                    <FlatList
                        data={medicines}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>

                            </View>
                        )}
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0 }} onPress={() => setModalVisible(true)}>
                        <FontAwesome name="plus-circle" size={30} color="#5ca02a" />
                    </TouchableOpacity>
                </View>

                {/* Nút xác nhận */}
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Xác nhận đơn thuốc</Text>
                </TouchableOpacity>

                {/* Modal chọn thuốc */}
                <MedicineSelectModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    filteredMedicines={filteredMedicines}
                    addMedicine={(item) => {
                        setNewMedicine({ name: item.name, quantity: item.quantity.toString(), unit: item.unit, price: item.price.toString() });
                        setModalVisible(false);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    form: { flex: 1, padding: 10 },
    // Phần thông tin bệnh nhân
    patientInfo: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

    // Phần danh sách thuốc
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
        paddingVertical: 10,
        alignItems: 'center',
    },
    tableText: { fontSize: 14 },

    // Các cột của bảng
    nameColumn: { flex: 2 },
    quantityColumn: { flex: 1, textAlign: 'center' },
    unitColumn: { flex: 1, textAlign: 'center' },
    priceColumn: { flex: 1.5, textAlign: 'right' },
    totalColumn: { flex: 1.5, textAlign: 'right' },

    // Nút xác nhận
    confirmButton: {
        backgroundColor: '#5ca02a',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    confirmButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

    selectMedicineText: { color: '#fff', fontWeight: 'bold' },
});

export default MedicineSelectionScreen;
