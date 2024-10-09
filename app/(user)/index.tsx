import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HomeNavigation from '../src/navigation/patient/HomeNavigation'

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeNavigation/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})