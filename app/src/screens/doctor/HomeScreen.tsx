import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../shared/Header';
import Item_List_View from '../../components/doctor/HomeScreen/Item_List_View';
import apiService from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';

const HomeScreen = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      getAppointments();
    }
  }, [user]);

  const getAppointments = async () => {
    setLoading(true);
    try {
      const doctorId = user?.user?.id; // Kiểm tra nested property
      console.log("Doctor ID:", doctorId); // Log doctorId
      const response = await apiService.getAppointmentByDoctor(doctorId);
      console.log("Appointments response:", response.data);
      if (response.data) {
        setAppointmentData(response.data);
      } else {
        setError("No appointments found");
      }
    } catch (error: any) {
      console.error("Error fetching appointments:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item: any) => {
    navigation.navigate('patient_detail_screen', { patientData: item });
  };

  const handleRefresh = () => {
    getAppointments(); // Refetch appointments when refreshing
  };

  return (
    <View style={styles.container}>
      <Header title='Home Screen' showBackButton={false} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {appointmentData.length > 0 ? (
        <FlatList
          data={appointmentData}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Item_List_View data={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          <Text>khong co du lieu</Text>
        </View>)}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
});
