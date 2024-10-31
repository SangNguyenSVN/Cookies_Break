import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/app/src/hooks/useAuth';

import axios from 'axios';
interface Category {
    _id: string;
    name: string;
    description: string;
    medicines: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Medicine {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    category: Category;
}

interface MedicineSelectModalProps {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    addMedicine: (medicine: Medicine) => void;
}

const MedicineSelectModal:  React.FC<MedicineSelectModalProps> = ({ isModalVisible, setModalVisible, addMedicine }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
    // lay id benh vien tu user 
    const { user } = useAuth()
    const hospitalId = ''// user?.user?.hospital
    // lay thong tin thuoc 
    const getMedicines = async () => {
        try {
           const response =  await axios.get(`http://192.168.1.11:3000/apis/medicine/hospital/670f547d51a17689a7f4601b`);
            // Assuming response contains an array of medicines
            setFilteredMedicines(response.data); // If you want to set the medicines in state
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };
    
    useEffect(() => {
        if (hospitalId) { // dieu kien neu co id benh vien
            getMedicines()
        }
    })
    // ham refresh
    const onRefresh = () => {
        getMedicines() // lay lai thong tin benh vien
    }

    return (
        <Modal visible={isModalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Medicine select</Text>

                    {/* Search Bar */}
                    <View style={styles.searchBar}>
                        <FontAwesome name="search" size={20} color="#aaa" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm kiếm ..."
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableText}>Tên thuốc</Text>
                        <Text style={styles.tableText}>Loại thuốc</Text>
                    </View>

                    {/* Medicine List */}
                    <FlatList
                        onRefresh={onRefresh}
                        data={filteredMedicines}
                        keyExtractor={(item) => item._id}
                        style={styles.medicineList}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.tableRow} onPress={() => addMedicine(item)}>
                                <Text style={styles.tableText}>{item.name}</Text>
                                <Text style={styles.tableText}>{item.price}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    {/* Close Modal Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 5,
        marginBottom: 10,
    },
    tableText: {
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    medicineList: {
        maxHeight: 200,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MedicineSelectModal;
