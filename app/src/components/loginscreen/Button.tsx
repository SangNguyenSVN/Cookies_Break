import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface ButtonProps{
    TextInfor:String;
}
const ButtonComponent: React.FC<ButtonProps> = ({TextInfor}) => {
  return (
    <View>
      <Pressable style={[styles.ButtonSTyles]}>
      <Text style={[styles.TextStyles]}>{TextInfor}</Text>
      </Pressable>
    </View>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
    ButtonSTyles:{
        width:251,
        height:42,
        backgroundColor:"#489458",
        alignSelf:"center",
        alignItems:"center",
        flexDirection:"column",
        justifyContent:"center",
        borderRadius:20
    
    },
    TextStyles:{
        fontSize:20,
        color:"white",

    }
})