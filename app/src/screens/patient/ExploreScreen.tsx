import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Hospital_Doctor_Tab from '../../components/patient/explore/Hospital_Doctor_Tab';
import Header from '../../shared/Header';
import { useNavigation } from '@react-navigation/native';
import DoctorItem_List_View from '../../components/patient/explore/DoctorItem_List_View';
import HospitalItem_List_View from '../../components/patient/explore/HospitalItem_List_View';
import InputSearch from '../../shared/InputSearch';
import apiService from '../../services/apiService';

const ExploreScreen = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState('hospital'); // Default tab to "hospital"
    const [searchQuery, setSearchQuery] = useState('');

    const [hospitalList, setHospitalList] = useState([]);
    const [doctorList, setDoctorList] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // State for refreshing

    useEffect(() => {
        getHospitals();
        getDoctors();
    }, []);

    const getHospitals = async () => {
        try {
            const dataH: any = await apiService.getHospitals();
            setHospitalList(dataH.data);
            console.log("Bệnh viện: ", dataH.data); // Ensure you log the new data
        } catch (error) {
            console.log("Không có dữ liệu bệnh viện :", error);
        }
    };

    const getDoctors = async () => {
        try {
            const dataD: any = await apiService.getDoctors();
            setDoctorList(dataD.data);
            console.log("Bác sĩ: ", dataD.data); // Ensure you log the new data
        } catch (error) {
            console.log("Không có dữ liệu bác sĩ :", error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true); // Start refreshing
        await Promise.all([getHospitals(), getDoctors()]); // Fetch both data
        setRefreshing(false); // End refreshing
    };

    const filteredHospitalList = hospitalList.filter((hospital: any) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredDoctorList = doctorList.filter((doctor: any) =>
        doctor.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItemDoctor = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { item, type: 'doctor' })}>
            <DoctorItem_List_View data={item} />
        </TouchableOpacity>
    );

    const renderItemHospital = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { item, type: 'hospital' })}>
            <HospitalItem_List_View data={item} />
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Header title={'Khám Phá'} showBackButton={false} />
                <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <Hospital_Doctor_Tab activeTab={(value: any) => setActiveTab(value)} />

                {activeTab === 'doctor' ? (
                    filteredDoctorList.length === 0 ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={filteredDoctorList}
                            renderItem={renderItemDoctor}
                            keyExtractor={(item: any) => item._id} // Use a unique key from your doctor item
                            contentContainerStyle={{ paddingBottom: 16 }} // Optional: add some padding at the bottom
                            refreshing={refreshing} // Add refreshing prop
                            onRefresh={onRefresh} // Add onRefresh prop
                        />
                    )
                ) : activeTab === 'hospital' ? (
                    filteredHospitalList.length === 0 ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={filteredHospitalList}
                            renderItem={renderItemHospital}
                            keyExtractor={(item: any) => item._id} // Use a unique key from your hospital item
                            contentContainerStyle={{ paddingBottom: 16 }} // Optional: add some padding at the bottom
                            refreshing={refreshing} // Add refreshing prop
                            onRefresh={onRefresh} // Add onRefresh prop
                        />
                    )
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
