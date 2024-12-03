import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Import useRouter


const index = () => {
  const [userType, setUserType] = useState<string>('');
  const router = useRouter(); // Lấy router từ expo-router

  const handleNavigate = (type: string) => {
    setUserType(type);
    router.push({ pathname: '/(public)/login', params: { userType: type } }); // Điều hướng và truyền dữ liệu
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/images/img-logo-cookies-break.png')} />
      <View style={styles.itemsChoose}>
        <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('patient')}>
          <Text style={styles.text}>Bệnh nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('doctor')}>
          <Text style={styles.text}>Bác sĩ</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1,
  },
  btn: {
    margin: 10,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 15,
  },
  img: {
    height: 200,
    width: 300,
  },
  itemsChoose: {
    marginTop: 20,
  },
});
