import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileNavigation from '../src/navigation/patient/ProfileNavigation'

const profile = () => {
  return (
    <View style={styles.container}>
      <ProfileNavigation />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})