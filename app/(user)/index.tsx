import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HomeNavigation from '../src/navigation/patient/HomeNavigation'
import { NavigationContainer } from '@react-navigation/native'

const Home = () => {
  return (
    <NavigationContainer independent={true}>
      <HomeNavigation />
    </NavigationContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});