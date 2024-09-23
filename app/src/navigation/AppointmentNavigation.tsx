import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppointmentScreen from '../screens/user/AppointmentScreen'
const AppointmentNavigation = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='user_appointment_screen' component={AppointmentScreen} />
    </Stack.Navigator>
  )
}

export default AppointmentNavigation

const styles = StyleSheet.create({})