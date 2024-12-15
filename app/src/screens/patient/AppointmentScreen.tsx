import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import Header from '../../shared/Header';
import HospitalItem_List_View from '../../components/patient/appointment/Item_List_View';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import apiService from '../../services/apiService';
import InputSearch from '../../shared/InputSearch';

const AppointmentScreen = () => {
  const navigation = useNavigation<any>(); // Get the navigation object
  const [hospitals, setHospitals] = useState<any>([]); // Tất cả bệnh viện
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho tìm kiếm
  const [refreshing, setRefreshing] = useState(false); // Trạng thái làm mới

  useFocusEffect(
    useCallback(() => {
      getHospitals();
    }, [])
  );
  // lay thon tin benh vien
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

  // Hàm refresh khi kéo xuống
  const onRefresh = async () => {
    setRefreshing(true);
    await getHospitals(); // Lấy lại dữ liệu
    setRefreshing(false); // Đặt trạng thái làm mới là false
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
      <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filterHospitals()} // Sử dụng hàm filterHospitals để lấy dữ liệu đã lọc
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Sử dụng _id làm khóa cho mỗi phần tử
        contentContainerStyle={styles.flatListContent}
        refreshing={refreshing} // Trạng thái làm mới
        onRefresh={onRefresh} // Hàm gọi lại khi kéo xuống
      />
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  flatListContent: {
    paddingHorizontal: 10,
  }
});
