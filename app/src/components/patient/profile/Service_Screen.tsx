import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '@/app/src/shared/Header';

const Service_Screen = () => {
  return (
    <View style={styles.container}>
      <Header title='Điều khoàn' showBackButton={false} />
      <View style={styles.textContainer}>
        <Text>...Đang cập nhật điều khoản...</Text>
      </View>
    </View>
  );
};

export default Service_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});
