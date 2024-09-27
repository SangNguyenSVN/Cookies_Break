import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Header from '../../shared/Header'
import Item_List_View from '../../shared/Item_List_View'
import { FlatList } from 'react-native-gesture-handler'

const HomeScreen = () => {
  
  const datamau: any = [
    {
      id: 1,
      img:'',
      name: 'Mau 1',
      price: 10000,
      desciptions: "abc",
    },
    {
      id: 1,
      name: 'Mau 1',
      price: 10000
    },
    {
      id: 1,
      name: 'Mau 1',
      price: 10000
    }

  ]
  return (
    <View>
      <Header title={"Sang dejo trai"} />
      <FlatList // list view 
       data={datamau} // data => item phu hop voi list => item = datamau
       keyExtractor={(item) => item.id.toString()} // Ensure you provide a unique key for each item
       renderItem={({ item }) => (
           <Item_List_View data={item}/>
       )}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})