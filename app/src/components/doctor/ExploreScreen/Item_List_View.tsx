import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
const Item_List_View = ({ data, index }: any) => {
  // Determine the text color based on the appointment status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'chưa thanh toán':
        return styles.pending; // Red for pending
      case 'đã thanh toán':
        return styles.confirmed; // Green for confirmed
      case 'chờ khám':
        return styles.waiting; // Yellow for waiting
      case 'đã khám':
        return styles.completed; // Blue for completed
      case 'chờ thanh toán':
        return styles.awaitingPayment; // Orange for awaiting payment
      default:
        return styles.default; // Default style
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.id}>ID: {index+1}</Text>
      <Text style={styles.name}>Tên Bệnh Nhân: {data.fullname}</Text>
      <Text style={styles.name}> {data.time} | {moment(data.date).format('DD-MM-YYYY')}</Text>
      <Text style={[styles.status, getStatusColor(data.status.name)]}>
        {data.status.name}  
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
    borderBottomColor: '#EBEAEA',
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
  waiting: {
    color: '#FFAD39', // Yellow for waiting (Chờ khám)
  },
  completed: {
    color: 'blue', // Blue for completed (Đã khám)
  },
  awaitingPayment: {
    color: 'orange', // Orange for awaiting payment (Chờ thanh toán)
  },
  default: {
    color: 'black', // Default color if no specific status
  },
});
