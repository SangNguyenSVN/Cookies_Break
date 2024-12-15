import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import Header from '../../shared/Header';
import { useAuth } from '../../hooks/useAuth';
import Item_View_Profile_1 from '../../components/patient/profile/Item_View_Profile_1';
import Item_View_Profile_2 from '../../components/patient/profile/Item_View_Profile_2';
import Item_View_Profile_3 from '../../components/patient/profile/Item_View_Profile_3';
import authService from '../../services/authService';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const [dataUser, setDataUser] = useState<[]>([]); 
  const { user } = useAuth();
  const getUser = async () => {
    if (user?.user?.id) { 
      try {
        const response = await authService.getUser(user.user.id);
        setDataUser(response.data); 
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
      }
    }
  };

  
  useFocusEffect(
    useCallback(() => {
        console.log('Màn hình đã được focus');
      getUser(); 
    }, [])
  );

  

  return (
    <View style={styles.container}>
      <Header title="Thông tin tài khoản" showBackButton={false} />
      <ScrollView>
        <View style={styles.item}>
          {dataUser ? (
            <>
              <Item_View_Profile_1 data={dataUser} />
              <Item_View_Profile_2 data={user} /> 
              <Item_View_Profile_3 />
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <Text>Đang tải thông tin...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#489458',
  },
  item: {
    marginHorizontal: 10,
    justifyContent: 'space-between',
    gap: 40,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ProfileScreen;
