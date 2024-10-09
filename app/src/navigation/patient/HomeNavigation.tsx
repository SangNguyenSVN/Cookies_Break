import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/patient/HomeScreen';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
     <Stack.Screen name="user_home_screen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})