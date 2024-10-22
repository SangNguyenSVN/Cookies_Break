import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';

const Item_View_Profile_1 = ({ data }: any) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(user);
  useEffect(() => {
    setUserData(data);
  }, [data]);

  const navigation = useNavigation<any>();

  const handleEditProfile = () => {
    if (userData) {
      console.log("userData: ", userData);
      navigation.navigate('user_profile_setting_screen', { dataUser: userData });
    }
  };
  const handleChangePassword = () =>{
    if (userData) {
      console.log("userData: ", userData);
      navigation.navigate('user_change_password_screen', { dataUser: userData });
    }
  }

  // Set a default avatar if userData or image is not available

  return (
    <View style={styles.container}>
      <View style={styles.item_container}>
        <View style={styles.options}>
          {user ? (
            <>
              <View style={styles.infomationSocial}>
                <Text style={styles.text1}>{user?.fullName || 'Tên người dùng'}</Text>
                <Text style={styles.text1}>{user?.primaryEmailAddress?.emailAddress || 'Email của bạn'}</Text>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.text1}>Sửa thông tin của bạn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangePassword}>
                <Text style={styles.text2}>Đổi mật khẩu</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.profilePicture}>
          <Image
            source={{ uri:userData?.user?.image || user?.imageUrl }} // Use URI from userData or default avatar
            style={styles.avatar}
          />
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
