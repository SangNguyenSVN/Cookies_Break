import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

// Dùng destructuring để lấy dữ liệu từ props
const Item_Card_New_View = ({ title, imageUrl }: { title: string, imageUrl: string }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item_Card_New_View;

const styles = StyleSheet.create({
  card: {
    width:"100%",
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
