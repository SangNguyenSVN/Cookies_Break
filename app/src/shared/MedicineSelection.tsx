import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MedicineSelectionScreen = () => {
    // Mock dữ liệu bệnh nhân
    const patientInfo = {
        name: 'Nguyễn Văn A',
        age: 45,
        diagnosis: 'Tiểu đường',
    };

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

    // Hàm để tính thành tiền
    const calculateTotal = (quantity: number, price: number) => {
        return quantity * price;
    };

    // Hàm thêm thuốc mới vào danh sách
    const addMedicine = () => {
        const { name, quantity, unit, price } = newMedicine;
        if (name && quantity && unit && price) {
            const newMedicineItem = {
                id: (medicines.length + 1).toString(),
                name,
                quantity: parseInt(quantity),
                unit,
                price: parseInt(price),
            };
            setMedicines([...medicines, newMedicineItem]);
            // Reset ô nhập thuốc mới
            setNewMedicine({ name: '', quantity: '', unit: '', price: '' });
        }
    };

    return (
        <View style={styles.container}>
            {/* Thông tin bệnh nhân */}
            <View style={styles.patientInfo}>
                <Text style={styles.sectionTitle}>Thông tin bệnh nhân</Text>
                <Text>Tên: {patientInfo.name}</Text>
                <Text>Tuổi: {patientInfo.age}</Text>
                <Text>Chẩn đoán: {patientInfo.diagnosis}</Text>
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
                            <Text style={[styles.tableText, styles.nameColumn]}>{item.name}</Text>
                            <Text style={[styles.tableText, styles.quantityColumn]}>{item.quantity}</Text>
                            <Text style={[styles.tableText, styles.unitColumn]}>{item.unit}</Text>
                            <Text style={[styles.tableText, styles.priceColumn]}>{item.price.toLocaleString()} VND</Text>
                            <Text style={[styles.tableText, styles.totalColumn]}>
                                {calculateTotal(item.quantity, item.price).toLocaleString()} VND
                            </Text>
                        </View>
                    )}
                />

                {/* Hàng nhập thuốc mới */}
                <View style={styles.tableRow}>
                    <TextInput
                        style={[styles.tableText, styles.nameColumn]}
                        placeholder="Tên thuốc"
                        value={newMedicine.name}
                        onChangeText={(text) => setNewMedicine({ ...newMedicine, name: text })}
                    />
                    <TextInput
                        style={[styles.tableText, styles.quantityColumn]}
                        placeholder="Số lượng"
                        keyboardType="numeric"
                        value={newMedicine.quantity}
                        onChangeText={(text) => setNewMedicine({ ...newMedicine, quantity: text })}
                    />
                    <TextInput
                        style={[styles.tableText, styles.unitColumn]}
                        placeholder="Đơn vị"
                        value={newMedicine.unit}
                        onChangeText={(text) => setNewMedicine({ ...newMedicine, unit: text })}
                    />
                    <TextInput
                        style={[styles.tableText, styles.priceColumn]}
                        placeholder="Giá"
                        keyboardType="numeric"
                        value={newMedicine.price}
                        onChangeText={(text) => setNewMedicine({ ...newMedicine, price: text })}
                    />
                    <TouchableOpacity onPress={addMedicine}>
                        <FontAwesome name="plus-circle" size={24} color="#5ca02a" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nút xác nhận */}
            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Xác nhận đơn thuốc</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },

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
});

export default MedicineSelectionScreen;