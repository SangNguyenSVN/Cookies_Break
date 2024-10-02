import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import DoctorLogin from './src/DoctorLogin';

const _layout = () => {
  const router = useRouter(); // Sử dụng useRouter để lấy router

  const handlePatientClick = () => {
    // Navigate to patient login
  };

  const handleDoctorClick = () => {
    router.push("./(publicd)")
  };

  return (
    <DoctorLogin/>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Chọn đối tượng</Text>
    //   <TouchableOpacity style={styles.btn} onPress={handlePatientClick}>
    //     <Text style={styles.btnText}>Bệnh nhân</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.btn} onPress={handleDoctorClick}>
    //     <Text style={styles.btnText}>Bác sĩ</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Light background color
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    color: '#333', // Darker text color
    fontWeight: 'bold', // Make title bold
  },
  btn: {
    backgroundColor: '#007BFF', // Primary button color
    padding: 15, // Padding for the button
    borderRadius: 5, // Rounded corners
    marginVertical: 10, // Margin between buttons
    width: '80%', // Button width
    alignItems: 'center', // Center text in the button
  },
  btnText: {
    color: '#fff', // White text color
    fontSize: 18, // Font size for button text
    fontWeight: '600', // Semi-bold text
  },
  btnHover: {
    opacity: 0.8, // Slightly dim the button on hover
  },
});
