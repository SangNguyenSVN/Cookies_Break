import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HistoryScreen from '../screens/user/HistoryScreen';

const HistoryNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="user_history_screen" component={HistoryScreen} />
            {/* <Stack.Screen name='History' component={HistoryScreen} />
            <Stack.Screen name='history-list' component={HistoryList} />
            <Stack.Screen name='appointment-information' component={AppointmentInfo} /> */}
        </Stack.Navigator>
    )
}

export default HistoryNavigation

const styles = StyleSheet.create({})