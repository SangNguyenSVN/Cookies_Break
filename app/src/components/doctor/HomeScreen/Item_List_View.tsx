import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
const Item_List_View = ({ data, index }: any) => {

  return (
    <View style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ID: {index + 1}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Thông Tin Bệnh Nhân:</Text>
        <Text style={styles.infoDetailText}>- Tên: {data.fullname}</Text>
        <Text style={styles.infoDetailText}>- Trạng Thái: {data.status.name}</Text>
        <Text style={styles.infoDetailText}>- Thời Gian Hẹn: {data.time} | {moment(data.date).format('YYYY-MM-DD')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#EBEAEA',
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
  },
  infoContainer: {
    paddingTop: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoDetailText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default Item_List_View;
