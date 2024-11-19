import Header from '@/app/src/shared/Header';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Doctor_List_View = ({ route }: { route: any }) => {
  const { hospital, selectedPackage } = route.params; // Lấy thông tin bệnh viện từ navigation parameters
  const navigation = useNavigation<any>();

  // Hàm để lấy tên viết tắt từ họ và tên
  const getInitials = (fullname: string) => {
    const names = fullname.split(' ');
    if (names.length < 2) return fullname.charAt(0).toUpperCase();
    return (
      names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase()
    );
  };

  // Hàm để render mỗi mục bác sĩ
  const renderDoctor = ({ item }: any) => (
    <TouchableOpacity
      style={styles.doctorContainer}
      onPress={() =>
        navigation.navigate('booking_screen', { doctor: item, hospital, selectedPackage })
      }
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.img} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initials}>{getInitials(item.fullname)}</Text>
        </View>
      )}
      <View>
        <Text style={styles.doctorName}>{item.fullname}</Text>
        <Text style={styles.doctorSpecialty}>Khoa: {item.specialty || "đang cập nhật"}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Bác sĩ" showBackButton={true} />
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
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  placeholder: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  doctorContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
