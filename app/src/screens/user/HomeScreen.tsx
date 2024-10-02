import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import Header from '../../shared/Header'
import Item_List_View from '../../components/homescreen/Item_List_View'
import { FlatList } from 'react-native-gesture-handler'
import ButtonLogout from '../../shared/ButtonLogout'

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
      id: 2,
      name: 'Mau 1',
      price: 10000
    },
  ]
  return (
    <View>
      <Header title={"Sang dejo trai"} showBackButton={false}/>
      <FlatList // list view 
       data={datamau} // data => item phu hop voi list => item = datamau
       keyExtractor={(item) => item.id.toString()} // Ensure you provide a unique key for each item
       renderItem={({ item }) => (
           <Item_List_View data={item}/>
       )}/>
       <ButtonLogout/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})