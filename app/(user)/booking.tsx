import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppointmentNavigation from '../src/navigation/patient/AppointmentNavigation'


const booking = () => {
  return (
    <View style={styles.container}>
      <AppointmentNavigation />
    </View>
  )
}

export default booking

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})