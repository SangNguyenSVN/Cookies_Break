import { StyleSheet, View, Text, TextInput, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../shared/Header';
import Item_List_View from '../../components/doctor/ExploreScreen/Item_List_View';
import Appointment_Tab from '../../components/doctor/ExploreScreen/Appointment_Tab';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../services/apiService';

interface Appointment {
  id: string;
  fullname: string;
  status: {
    name: string;
  };
}

const ExploreScreen = () => {
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);  // Strong typing
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();

  const doctorId = user?.user?.id;

  useEffect(() => {
    if (doctorId) {
      getAppointments();  // Fetch appointments only if doctorId is available
    }
  }, [doctorId]); // Dependency on doctorId

  const getAppointments = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAppointmentByDoctor(doctorId);
      if (response.data) {
        setAppointmentData(response.data);
      } else {
        setError('No appointments found');
      }
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      setError(error.message || 'Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState('all');  // Default tab set to 'all'
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Function to filter appointments based on status and search query
  const filterData = () => {
    return appointmentData.filter((appointment) => {
      return (
        appointment.fullname.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === ''
      );
    });
  };

  // Get filtered appointment data based on the active tab
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case 'all':
        return filterData();  // Return all appointments for 'all' tab
      case 'chưa thanh toán':
        return filterData().filter(
          (appointment) => appointment.status.name === 'chưa thanh toán'
        );
      case 'chờ khám':
        return filterData().filter(
          (appointment) => appointment.status.name === 'chờ khám'
        );
      case 'đã khám':
        return filterData().filter(
          (appointment) => appointment.status.name === 'đã khám'
        );
      case 'chờ thanh toán':
        return filterData().filter(
          (appointment) => appointment.status.name === 'chờ thanh toán'
        );
      case 'đã thanh toán':
        return filterData().filter(
          (appointment) => appointment.status.name === 'đã thanh toán'
        );
      default:
        return [];  // Fallback in case of an unknown tab
    }
  };

  const filteredAppointments = getFilteredAppointments();  // Get filtered appointments

  return (
    <View style={styles.container}>
      <Header title="Tìm kiếm" showBackButton={false} />
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm bệnh nhân hoặc trạng thái..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Appointment_Tab activeTab={setActiveTab} /> 

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}  // Display the filtered appointments
          renderItem={({ item, index }) => <Item_List_View data={item} index={index} />}
          keyExtractor={(item: any) => item._id}
        />
      ) : (
        <Text>No appointments available</Text>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',  // Change background color if needed
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
