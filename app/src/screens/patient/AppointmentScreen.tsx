import { StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../shared/Header';
import HospitalItem_List_View from '../../components/patient/appointment/Item_List_View';
import { useNavigation } from '@react-navigation/native';
import apiService from '../../services/apiService';

const AppointmentScreen = () => {
  const navigation = useNavigation<any>(); // Get the navigation object
  const [hospitals, setHospitals] = useState<any>([]); // Tất cả bệnh viện
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho tìm kiếm

  useEffect(() => {
    getHospitals(); 
  }, []);

  const getHospitals = async () => {
    try {
      const data: any = await apiService.getHospitals(); 
      setHospitals(data.data);
      console.log("Bệnh viện: ", data.data); // Đảm bảo bạn in ra dữ liệu mới
    } catch (error) {
      console.log("Không có dữ liệu bệnh viện :", error);
    }
  };

  // Hàm để tìm kiếm bệnh viện
  const filterHospitals = () => {
    return hospitals.filter((hospital: { name: string; }) => 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Function to render each hospital item
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('package_booking_screen', { hospital: item })} // Truyền toàn bộ thông tin bệnh viện
    >
      <HospitalItem_List_View data={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title='Đặt lịch khám' showBackButton={false} />
      
      {/* TextInput để tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm bệnh viện..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filterHospitals()} // Sử dụng hàm filterHospitals để lấy dữ liệu đã lọc
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20, // Optional: padding for better appearance
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
