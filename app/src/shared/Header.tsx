import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface HeaderProps {
  title: string; // Tiêu đề của header
  showBackButton: boolean; // Biến để điều khiển hiển thị nút quay lại
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
  const navigation = useNavigation();

  const goBack = () => {
    try {
      navigation.goBack();
    } catch {
      console.log("Error goBack() in Header component");
    }
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <AntDesign name="leftcircleo" size={40} color="white" />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#489458', // Màu nền của header
    padding: 18,
    paddingTop: 44, // Khoảng cách cho tai thỏ (nếu có)
    position: 'relative', // Relative position to use absolute positioning for the back button
  },
  titleContainer: {
    flex: 1, // Chiếm không gian còn lại
    alignItems: 'center', // Giữa theo chiều ngang
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute', // Absolute position for the back button
    bottom: 10,
    left: 10
  },
});
