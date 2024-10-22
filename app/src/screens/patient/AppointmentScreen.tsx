import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../shared/Header';
import HospitalItem_List_View from '../../components/patient/appointment/Item_List_View';
import { useNavigation } from '@react-navigation/native';

const AppointmentScreen = () => {
  const navigation = useNavigation<any>(); // Get the navigation object

  const hospitals = [
    {
      id: '1',
      name: 'Bệnh viện Nhi Đồng 1',
      image: 'https://via.placeholder.com/100',
      address: '123 Đường ABC',
      doctors: [
        { id: '1-1', name: 'Dr. Nguyen Van A', specialty: 'Nhi khoa' },
        { id: '1-2', name: 'Dr. Tran Thi B', specialty: 'Tim mạch' },
      ],
      packages: [
        {
          id: 'pkg-1',
          name: 'Gói khám tổng quát',
          price: 500000, // VND
          description: 'Khám tổng quát bao gồm kiểm tra sức khỏe toàn diện.',
        },
        // Các gói khám khác có thể được thêm tại đây thông qua admin
      ],
    },
    {
      id: '2',
      name: 'Bệnh viện Chợ Rẫy',
      image: 'https://via.placeholder.com/100',
      address: '789 Đường GHI',
      doctors: [
        { id: '2-1', name: 'Dr. Hoang Van D', specialty: 'Nội khoa' },
        { id: '2-2', name: 'Dr. Pham Thi E', specialty: 'Ngoại khoa' },
      ],
      packages: [
        {
          id: 'pkg-2',
          name: 'Gói khám tổng quát',
          price: 600000, // VND
          description: 'Gói khám bao gồm kiểm tra tổng quát và xét nghiệm cơ bản.',
        },
        // Các gói khám khác có thể được thêm tại đây thông qua admin
      ],
    },
  ];
  

  // Function to render each hospital item
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('package_booking_screen',  { hospital: item })} // Truyền toàn bộ thông tin bệnh viện
    >
      <HospitalItem_List_View data={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title='Lịch khám' showBackButton={false} />
      <FlatList
        data={hospitals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});
