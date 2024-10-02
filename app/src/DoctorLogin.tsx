import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const DoctorLogin = () => {
  return (
      <Stack initialRouteName='(publicd)' >
        <Stack.Screen name="(publicd)" options={{ headerShown: false }} />
        <Stack.Screen name="(doctor)" options={{headerShown: false}}/>
      </Stack>
  )
}

export default DoctorLogin

const styles = StyleSheet.create({})