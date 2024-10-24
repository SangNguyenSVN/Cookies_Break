import Header from '@/app/src/shared/Header';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Doctor_List_View = ({ route }: { route: any }) => {
  const { hospital, selectedPackage } = route.params; // Lấy thông tin bệnh viện từ navigation parameters
  const navigation = useNavigation<any>(); 
  


  // Hàm để render mỗi mục bác sĩ
  const renderDoctor = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.doctorContainer}     
      onPress={() => navigation.navigate('booking_screen', { doctor: item, hospital, selectedPackage })} 
    >
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialty}>{item.specialty}</Text> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title='Bác sĩ' showBackButton={true} />
      <View style={styles.listContainer}> 
        <FlatList
      
          data={hospital.doctors} // Sử dụng hospital.doctors để hiển thị danh sách bác sĩ
          renderItem={renderDoctor}
          keyExtractor={(doctor) => doctor._id}
          ListEmptyComponent={<Text>Không có bác sĩ nào.</Text>} // Hiển thị nếu không có bác sĩ
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16, // Padding cho danh sách bác sĩ
  },
  doctorContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#555',
  },
});

export default Doctor_List_View;
