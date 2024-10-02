import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
const MainActivity = () => {
    return (
        <Stack initialRouteName='(publics)' >
            <Stack.Screen name="(publics)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="(doctors)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="(users)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default MainActivity

const styles = StyleSheet.create({})