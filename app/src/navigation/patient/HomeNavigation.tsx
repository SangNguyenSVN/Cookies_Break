import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/patient/HomeScreen';
import HospitalScreen from '../../screens/patient/HospitalScreen';

export type RootStackParamList = {
  user_home_screen: undefined; // No params for HomeScreen
  user_hospital_screen: { specialty: string }; // Params for HospitalScreen
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="user_home_screen" component={HomeScreen} />
      <Stack.Screen name="user_hospital_screen" component={HospitalScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation

const styles = StyleSheet.create({})