import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Search = () => {
  return (
    <View>
      <View style={[styles.Container]}>
        
            <Image style={{width:24,height:24}} source={require("../../../assets/icon/Search_alt_fill.png")}/>
            <TextInput
            style={[styles.TextInputStyle]}
            placeholderTextColor={"#D9D9D961"}
            placeholder='Nhập tên phòng khám....'
            />
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
Container:{
    width:"92%",
    height:30,
    borderRadius:90,
    backgroundColor:"#4B8357AB",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
},
TextInputStyle:{
    width:"80%",
    height:"100%",
    fontSize:16,fontWeight:"400"
}
})