import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HistoryNavigation from '../src/navigation/HistoryNavigation'
const History = () => {
  return (
    <View style={styles.container}>
      <HistoryNavigation/>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})