import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../shared/Header';
import Item_List_View from '../../components/doctor/HomeScreen/Item_List_View';

const HomeScreen = () => {
  const navigation = useNavigation();

  const appointmentData = [
    { 
      id: 1, 
      patientName: 'Nguyễn Văn A', 
      status: 'Đã xác nhận', 
      appointmentTime: '10:00 AM, 01/10/2024', 
      note: 'Khám sức khỏe tổng quát', // Thông tin khám của bệnh nhân
      reason: '' // Lý do bác sĩ từ chối (nếu có)
    },
    { 
      id: 2, 
      patientName: 'Trần Thị B', 
      status: 'Chưa xác nhận', 
      appointmentTime: '11:00 AM, 01/10/2024', 
      note: 'Kiểm tra định kỳ', // Thông tin khám của bệnh nhân
      reason: '' // Lý do bác sĩ từ chối (nếu có)
    },
    { 
      id: 3, 
      patientName: 'Lê Văn C', 
      status: 'Đã hủy', 
      appointmentTime: '12:00 PM, 01/10/2024', 
      note: 'Khám tim mạch', // Thông tin khám của bệnh nhân
      reason: 'Bệnh nhân đã hủy hẹn' // Lý do từ chối
    },
  ];
  

  const handlePress = (item:any) => {
    navigation.navigate('patient_detail_screen', { patientData: item }); 
  };

  return (
    <View style={styles.container}>
      <Header title='Home Screen' showBackButton={false} />
      <FlatList
        data={appointmentData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Item_List_View data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
