import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Search = () => {
  return (
    <View>
      <View style={[styles.Container]}>
        <TextInput
        style={[styles.TextStyle]}
        placeholder='Gửi câu hỏi tới bác sĩ & cộng đồng Cookies Break'
        placeholderTextColor={"#FFFFFF"}
        />
        <Pressable style={[styles.ButonStyle]}>
            <Image style={{width:20,height:20}} source={require("../../../assets/icon/Vector_Item.png")}/>
        </Pressable>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    Container:{
        alignSelf:"center",
        flexDirection:"row",
        width:"90%",
        height:48,
        backgroundColor:"#FFFFFF36",
        borderRadius:10

        
    },
    TextStyle:{
        width:"85%",
        fontSize:10,
        fontWeight:"400",
        paddingLeft:10
    },
   
    ButonStyle:{
        width:"15%",
        height:"100%",
        backgroundColor:"#D9D9D970",
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }
})