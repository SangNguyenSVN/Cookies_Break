import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/doctor/HomeScreen';
import PatientDetailScreen from '../../components/doctor/HomeScreen/PatientDetailScreen';
import MedicineSelectionScreen from '../../shared/MedicineSelection';
import ConfirmScreen from '../../components/doctor/HomeScreen/ConfirmScreen';

const Stack = createStackNavigator(); 
const HomeNavigation = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
     <Stack.Screen name="user_home_screen" component={HomeScreen} />
     <Stack.Screen name="patient_detail_screen" component={PatientDetailScreen} />
     <Stack.Screen name="medicine_selection_screen" component={MedicineSelectionScreen}/>
     <Stack.Screen name="ConfirmPrescription" component={ConfirmScreen}/>
    </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})