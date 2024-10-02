// components/doctor/HomeScreen/Item_List_View.tsx
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Item_List_View = ({ data }: { data: { id: number; patientName: string; status: string } }) => {
  // Determine the text color based on the appointment status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Chưa thanh toán':
        return styles.pending; // Red for pending
      case 'Đã thanh toán':
        return styles.confirmed; // Green for confirmed
      default:
        return styles.default; // Default style
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.id}>ID: {data.id}</Text>
      <Text style={styles.name}>Tên Bệnh Nhân: {data.patientName}</Text>
      <Text style={[styles.status, getStatusColor(data.status)]}>
         {data.status}
      </Text>
    </View>
  );
};

export default Item_List_View;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: {
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    marginHorizontal: 10,
  },
  status: {
    fontWeight: 'bold', // Make status text bold
  },
  confirmed: {
    color: '#489458', // Green for confirmed
  },
  pending: {
    color: 'red', // Red for pending
  },
  default: {
    color: 'black', // Default color if no specific status
  },
});
