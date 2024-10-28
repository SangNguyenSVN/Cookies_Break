import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Import useRouter
import Item_Icon_List_View from '../src/components/patient/homescreen/Item_Icon_List_View';
import HomeScreen from '../src/screens/patient/HomeScreen';
import Home from '../(user)';
import Item_Hospital_Card_View from '../src/components/patient/explore/Item_Hospital_Card_View';
import HospitalScreen from '../src/navigation/patient/HospitalScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from '../src/navigation/patient/HomeNavigation';

const index = () => {
  const [userType, setUserType] = useState<string>('');
  const router = useRouter(); // Lấy router từ expo-router

  const handleNavigate = (type: string) => {
    setUserType(type);
    router.push({ pathname: '/(public)/login', params: { userType: type } }); // Điều hướng và truyền dữ liệu
  };

  return (
    // <View style={styles.container}>
    //   <Image style={styles.img} source={require('../../assets/images/react-logo.png')} />
    //   <View style={styles.itemsChoose}>
    //     <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('patient')}>
    //       <Text style={styles.text}>Bệnh nhân</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('doctor')}>
    //       <Text style={styles.text}>Bác sĩ</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
<NavigationContainer independent={true}>
      <HomeNavigation />
    </NavigationContainer>
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
    height: 80,
    width: 80,
  },
  itemsChoose: {
    marginTop: 20,
  },
});
