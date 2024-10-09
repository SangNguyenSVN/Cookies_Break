import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const Item_View_Profile_1 = (data: any) => {
  const navigation = useNavigation(); // Initialize navigation
  const handleEditProfile = () => {
    console.log(data)
    navigation.navigate('user_profile_setting_screen', { dataUser: data });
  };
  return (
    <View style={styles.container}>
      <View style={styles.item_container}>
        <View style={styles.options}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.text1}>
              Sửa thông tin của bạn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text2}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profilePicture}>
          <View style={styles.avatarPlaceholder} />
        </View>
      </View>
    </View>
  )
}

export default Item_View_Profile_1

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text1: {
    color: '#4B66ED'
  },
  text2: {
    color: '#D12626'
  },
  profilePicture: {
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 90,
  },
})