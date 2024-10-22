import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import { useUser } from '@clerk/clerk-expo';



const Item_View_Profile_1 = ({ data }: any) => {
  const { user } = useUser(); // Get user information from Clerk
  const userData = data;

  const navigation = useNavigation<any>();

  const handleEditProfile = () => {
    console.log("userData: ", userData);
    navigation.navigate('user_profile_setting_screen', { dataUser: userData });
  };

  const isUserFromClerk = Boolean(userData?.imageUrl);

  return (
    <View style={styles.container}>
      <View style={styles.item_container}>
        <View style={styles.options}>
          {isUserFromClerk ? (
            <>
              <View style={styles.infomationSocial}>
                <Text style={styles.text1}>{userData.fullName}</Text>
                <Text style={styles.text1}>{userData.primaryEmailAddress?.emailAddress}</Text>
              </View>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.text1}>Sửa thông tin của bạn</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.text1}>Sửa thông tin của bạn</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.text2}>Đổi mật khẩu</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.profilePicture}>
          {isUserFromClerk ? (
            <Image
              source={{ uri: userData.image }} // Use URI from userData
              style={styles.avatar}
            />
          ) : (
            <Image
              source={{ uri: userData.user.image }} // Use URI from userData
              style={styles.avatar}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Item_View_Profile_1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text1: {
    color: '#4B66ED',
  },
  text2: {
    color: '#D12626',
  },
  profilePicture: {
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 30, // Make it circular
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Make it circular
  },
  infomationSocial: {
    justifyContent: 'center',
    gap: 10,
  },
});
