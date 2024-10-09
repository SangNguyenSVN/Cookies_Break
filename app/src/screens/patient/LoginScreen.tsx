import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../components/loginscreen/CustomInput'
import ButtonComponent from '../../components/loginscreen/Button'

const LoginScreen = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.TextStyle]}>Welcom Back!</Text>
     <View style={{alignItems:"center",paddingTop:23,paddingBottom:35}}> 
        <Text style={[styles.Text2style]}>Simplity your workflow and boost your productivity with </Text>
     <Text><Text style={{fontWeight:"600"}}> Cookies Break App.</Text> Get started for  free.</Text></View>
      <Image style={{width:321,height:191,alignSelf:"center"}} source={require('../../assets/picbg.png')} />
      <View style={{height:35}}></View>
      <CustomInput  placeholder="Username" />
      <CustomInput placeholder='Password' secureTextEntry />
      <View style={{height:58}}></View>
      <ButtonComponent
      TextInfor={"Login"}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({  
    container: {
 
    justifyContent: 'center',
 
  },
    TextStyle:{
        color:"black",
        alignSelf:"center",
        fontSize:32,
        fontWeight:"600",
        
    },
    Text2style:{
        color:"black",
        fontSize:12,
        alignSelf:'center',
       
    }

})