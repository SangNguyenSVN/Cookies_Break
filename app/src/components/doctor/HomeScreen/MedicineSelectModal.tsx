import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/app/src/hooks/useAuth';
import apiService from '@/app/src/services/apiService';

interface MedicineSelectModalProps {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectMedicines: (medicines: SelectedMedicine[]) => void;
}

interface SelectedMedicine {
    id: string;
    name: string;
    price: number;
}

const MedicineSelectModal: React.FC<MedicineSelectModalProps> = ({ isModalVisible, setModalVisible, selectMedicines }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [medicines, setMedicines] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedicines, setSelectedMedicines] = useState<SelectedMedicine[]>([]);
    const { user } = useAuth();
    const hospitalId = user?.user.hospital;

    const getMedicines = async () => {
        setLoading(true);
        try {
            const data = await apiService.getMedicinesByHospital(hospitalId);
            setMedicines(data.data);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMedicines();
    }, []);

    const handleSelect = (medicine: any) => {
        const isSelected = selectedMedicines.some(item => item.id === medicine._id);

        if (isSelected) {
            // Unselect medicine
            setSelectedMedicines(selectedMedicines.filter(item => item.id !== medicine._id));
        } else {
            // Select medicine
            const selectedMedicine: SelectedMedicine = {
                id: medicine._id,
                name: medicine.name,
                price: medicine.price,
            };
            setSelectedMedicines([...selectedMedicines, selectedMedicine]);
        }
    };

    const handleSave = () => {
        selectMedicines(selectedMedicines)
        setModalVisible(false)
    }

    const isMedicineSelected = (medicineId: string) => {
        return selectedMedicines.some(med => med.id === medicineId);
    };

    // Lọc danh sách thuốc dựa trên searchQuery
    const filteredMedicines = medicines.filter((medicine: any) => 
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal visible={isModalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Medicine Select</Text>

                    <View style={styles.searchBar}>
                        <FontAwesome name="search" size={20} color="#aaa" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <View style={styles.tableHeader}>
                        <Text style={styles.tableText}>Medicine Name</Text>
                        <Text style={styles.tableText}>Price</Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#007bff" />
                    ) : (
                        <FlatList
                            data={filteredMedicines} 
                            keyExtractor={(item) => item._id}
                            style={styles.medicineList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.tableRow,
                                        isMedicineSelected(item._id) && styles.selectedRow,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.tableText}>{item.name}</Text>
                                    <Text style={styles.tableText}>{item.price}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}

                    <TouchableOpacity style={styles.closeButton} onPress={() => handleSave()}>
                        <Text style={styles.closeButtonText}>Save</Text>
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
    selectedRow: {
        borderColor: '#007bff',
        borderWidth: 1,
        borderRadius: 5,
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
