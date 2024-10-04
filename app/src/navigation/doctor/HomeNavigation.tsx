import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/doctor/HomeScreen';
import PatientDetailScreen from '../../screens/doctor/PatientDetailScreen';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
     <Stack.Screen name="user_home_screen" component={HomeScreen} />
     <Stack.Screen name="PatientDetailScreen" component={PatientDetailScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})