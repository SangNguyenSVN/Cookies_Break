import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import { useUser } from '@clerk/clerk-expo';

const Item_View_Profile_1 = (data: any) => {

  const { user } = useUser(); // Lấy thông tin người dùng từ Clerk

  const userData = user || data;

  const navigation = useNavigation();

  const handleEditProfile = () => {
    console.log(userData);
    navigation.navigate('user_profile_setting_screen', { dataUser: userData });
  };
  const isUserFromClerk = userData && userData.imageUrl ? true : false;

  return (
    <View style={styles.container}>
      <View style={styles.item_container}>
        <View style={styles.options}>
          {isUserFromClerk ? (
            <View style={styles.infomationSocial}>
              <Text style={styles.text1}>{userData?.fullName}</Text>
              <Text style={styles.text1}>{userData?.primaryEmailAddress?.emailAddress}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleEditProfile}>
              <Text style={styles.text1}>Sửa thông tin của bạn</Text>
            </TouchableOpacity>
          )}
          {!isUserFromClerk && (
            <TouchableOpacity>
              <Text style={styles.text2}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profilePicture}>
          {isUserFromClerk ? (
            <Image
              source={{ uri: userData?.imageUrl }} // Sử dụng URI từ userData
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Hình tròn
  },
  infomationSocial:{
    justifyContent:'center',
    gap: 10
  }
})