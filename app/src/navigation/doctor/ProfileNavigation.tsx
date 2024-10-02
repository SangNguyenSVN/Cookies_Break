import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../../screens/doctor/ProfileScreen';


const ProfileNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='user_profile_screen' component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation

const styles = StyleSheet.create({})