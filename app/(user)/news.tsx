import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NewsNavigation from '../src/navigation/patient/NewsNavigation'

const News = () => {
  return (
    <View style={styles.container}>
      <NewsNavigation/>
    </View>
  )
}

export default News

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})