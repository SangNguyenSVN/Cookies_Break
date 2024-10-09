import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileNavigation from '../src/navigation/patient/ProfileNavigation'


const Profile = () => {
  return (
    <View style={styles.container}>
      <ProfileNavigation/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})