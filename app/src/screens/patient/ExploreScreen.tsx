import { StyleSheet, View, TextInput, ActivityIndicator, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import Hospital_Doctor_Tab from '../../components/patient/explore/Hospital_Doctor_Tab';
import Header from '../../shared/Header';
import { useNavigation } from '@react-navigation/native';
import DoctorItem_List_View from '../../components/patient/explore/DoctorItem_List_View';
import HospitalItem_List_View from '../../components/patient/explore/HospitalItem_List_View';

const ExploreScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('hospital'); // Default tab to "hospital"
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data for hospitals
    const [hospitalList, setHospitalList] = useState([
        {
            id: 1,
            name: "Bệnh viện Chợ Rẫy",
            address: "Số 201, Nguyễn Chí Thanh, P.12, Q.5, TP.HCM",
        },
        {
            id: 2,
            name: "Bệnh viện 115",
            address: "Số 1, Đường 115, Q.10, TP.HCM",
        },
    ]);

    // Sample data for doctors
    const [doctorList, setDoctorList] = useState([
        {
            id: 1,
            name: "Bác sĩ Nguyễn Văn A",
            image: "https://i.pravatar.cc/150?img=1",
            hospitalId: 1, // Link doctor to the hospital
        },
        {
            id: 2,
            name: "Bác sĩ Trần Thị B",
            image: "https://i.pravatar.cc/150?img=2",
            hospitalId: 1,
        },
        {
            id: 3,
            name: "Bác sĩ Lê Văn C",
            image: "https://i.pravatar.cc/150?img=3",
            hospitalId: 2,
        },
        {
            id: 4,
            name: "Bác sĩ Phạm Thị D",
            image: "https://i.pravatar.cc/150?img=4",
            hospitalId: 2,
        },
    ]);

    // Filter hospital and doctor lists based on the search query
    const filteredHospitalList = hospitalList.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredDoctorList = doctorList.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Header title={'Khám Phá'} showBackButton={false} />

                {/* Search bar */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Tìm kiếm bệnh viện hoặc bác sĩ..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />

                {/* Tabs for switching between hospitals and doctors */}
                <Hospital_Doctor_Tab activeTab={(value: any) => setActiveTab(value)} />

                {/* Display filtered data based on the active tab and search query */}
                {
                    activeTab === 'doctor' ? (
                        filteredDoctorList.length === 0 ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            filteredDoctorList.map((doctor) => (
                                <TouchableOpacity key={doctor.id} onPress={() => {
                                    navigation.navigate('Details', { item: doctor, type: 'doctor' });
                                }}>
                                    <DoctorItem_List_View data={doctor} />
                                </TouchableOpacity>
                            ))
                        )
                    ) : activeTab === 'hospital' ? (
                        filteredHospitalList.length === 0 ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            filteredHospitalList.map((hospital) => (
                                <TouchableOpacity key={hospital.id} onPress={() => {
                                    navigation.navigate('Details', { item: hospital, type: 'hospital' });
                                }}>
                                    <HospitalItem_List_View data={hospital} />
                                </TouchableOpacity>
                            ))
                        )
                    ) : null
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
});
