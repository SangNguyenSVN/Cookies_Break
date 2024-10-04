import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Item_List_View = ({data}: any) => {
  return (
    <View>
      <Image source={require('../../../../assets/images/icon.png')} style={{width: 50, height:50}}/>
      <Text>{data.id}</Text>
      <Text>{data.name}</Text>
      <Text>{data.price}</Text>
    
      <Text> Nhựt </Text><Text> Nhựt </Text><Text> Nhựt </Text><Text> Nhựt </Text><Text> Nhựt </Text><Text> Nhựt </Text>
    </View>
  )
}

export default Item_List_View

const styles = StyleSheet.create({
  
})