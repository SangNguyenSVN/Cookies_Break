import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../screens/user/ExploreScreen'

const ExploreNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name='user_explore_screen' component={ExploreScreen}/>
        </Stack.Navigator>
    )
}

export default ExploreNavigation

const styles = StyleSheet.create({})
