import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserLogin from '../../UserLogin';
import DoctorLogin from '../../DoctorLogin';

const LoginNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='user_login' component={UserLogin} />
            <Stack.Screen name='doctor_login' component={DoctorLogin} />
        </Stack.Navigator>
    )
}

export default LoginNavigation

const styles = StyleSheet.create({})