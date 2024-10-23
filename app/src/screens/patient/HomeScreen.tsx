import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Header from '../../shared/Header'
import Item_List_View from '../../components/patient/homescreen/Item_List_View'
import { FlatList } from 'react-native-gesture-handler'
import ButtonLogout from '../../shared/ButtonLogout'
import Item_Icon_List_View from '../../components/patient/homescreen/Item_Icon_List_View'
import Search from '../../components/patient/homescreen/Search'
import Item_Specialties_List_View from '../../components/patient/homescreen/Item_Specialties_List_View'
import Item_Card_View from '../../components/patient/homescreen/Item_Card_View'

const HomeScreen = () => {


  // const datamau: any = [
  //   {
  //     id: 1,
  //     img:'',
  //     name: 'Mau 1',
  //     price: 10000,
  //     desciptions: "abc",
  //   },
  //   {
  //     id: 2,
  //     name: 'Mau 1',
  //     price: 10000
  //   },
  // ]
  console.log('HomeScreen rendered');
  return (
    <View style={{position:"relative"}}>
      <Header title={"Cookies Break"} showBackButton={false}/>
      {/* <FlatList // list view 
       data={datamau} // data => item phu hop voi list => item = datamau
       keyExtractor={(item) => item.id.toString()} // Ensure you provide a unique key for each item
       renderItem={({ item }) => (
           <Item_List_View data={item}/>
       )}/>
       <ButtonLogout/> */}
      <View style={{width:"100%",height:140,backgroundColor:"#489458"}}>
      <Search/>
      </View>
       <View  style={{position:"absolute",alignItems:'center',marginTop:165,width:"100%"}}>
        <Item_Icon_List_View/>
       </View> 
       <Image style={{width:24,height:24,position:"absolute",marginLeft:330,marginTop:50}} source={require("../../assets/icon/Bell_fill.png")}/>
        <Text style={[styles.TextStyle,{paddingTop:80}]}>Chuyên khoa</Text>
        <View style={{height:22}}></View>
        <Item_Specialties_List_View/>
        <View style={[styles.smallcontainer,{paddingTop:71,paddingBottom:16}]}>
          <Text style={[styles.TextStyle,{fontSize:12}]}>
            Bác sĩ nỗi bật
          </Text>
        <Pressable>
        <Text style={[styles.TextStyle,{color:"#589FFC",fontSize:12}]}>
          Xem thêm
          </Text>
        </Pressable>
       
        </View>
        <Item_Card_View
        Name={"GS.TS.BS Wade Brackenbury"}
        Description={"Nội thần kinh - tim mạch"}
        ImgSource={require("../../../src/assets/icon/avatar.png")}
        />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  TextStyle:{
    fontSize:13,
    fontWeight:"400",
    paddingLeft:20
  },
  smallcontainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"92%"
  }
})