import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppointmentScreen from '../../screens/patient/AppointmentScreen'
import BookingScreen from '../../shared/screens/BookingScreen'
import Doctor_List_View from '../../components/patient/appointment/Doctor_List_View'
import Package_List_View from '../../components/patient/appointment/Package_List_View'
const AppointmentNavigation = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='user_appointment_screen' component={AppointmentScreen} />
      <Stack.Screen name='booking_screen' component={BookingScreen}/>
      <Stack.Screen name='doctor_booking_screen' component={Doctor_List_View}/>
      <Stack.Screen name='package_booking_screen' component={Package_List_View}/>
    </Stack.Navigator>
  )
}

export default AppointmentNavigation

const styles = StyleSheet.create({})