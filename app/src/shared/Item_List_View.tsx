import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item_List_View = ({data}: any) => {
  return (
    <View>
      <Text>{data.id}</Text>
      <Text>{data.name}</Text>
      <Text>{data.price}</Text>
    </View>
  )
}

export default Item_List_View

const styles = StyleSheet.create({
  
})