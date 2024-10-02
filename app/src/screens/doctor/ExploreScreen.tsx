import { StyleSheet, View, Text, TextInput, ActivityIndicator, FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from '../../shared/Header';
import Item_List_View from '../../components/doctor/ExploreScreen/Item_List_View';
import Appointment_Tab from '../../components/doctor/ExploreScreen/Appointment_Tab';

const ExploreScreen = () => {
  const appointmentData = [
    { id: 1, patientName: 'Nguyễn Văn A', status: 'Đã thanh toán', appointmentTime: '10:00 AM, 01/10/2024' },
    { id: 2, patientName: 'Trần Thị B', status: 'Chưa thanh toán', appointmentTime: '11:00 AM, 01/10/2024' },
    { id: 3, patientName: 'Lê Văn C', status: 'Đã thanh toán', appointmentTime: '12:00 PM, 01/10/2024' },
  ];

  const [activeTab, setActiveTab] = useState('all'); // Set default tab to 'all'
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Function to filter appointments based on status and search query
  const filterData = () => {
    return appointmentData.filter(appointment => {
      return (
        (appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
      );
    });
  };

  // Get filtered appointment data based on the active tab
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case 'all':
        return filterData(); // Return all appointments for 'all' tab
      case 'chua thanh toan':
        return appointmentData.filter(appointment => appointment.status === 'Chưa thanh toán' && 
            (appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === ''));
      case 'da thanh toan':
        return appointmentData.filter(appointment => appointment.status === 'Đã thanh toán' && 
            (appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === ''));
      default:
        return []; // Fallback in case of an unknown tab
    }
  };

  const filteredAppointments = getFilteredAppointments(); // Get filtered appointments

  return (
    <View style={styles.container}>
      <Header title='Explore Screen' showBackButton={false} />
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm bệnh nhân hoặc trạng thái..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Appointment_Tab activeTab={setActiveTab} />

      { 
        // Render the appropriate content based on the active tab and data availability
        !filteredAppointments.length ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredAppointments} // Display the filtered appointments
            renderItem={({ item }) => <Item_List_View data={item} />}
            keyExtractor={item => item.id.toString()}
          />
        )
      }
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Change background color if needed
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
