import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface CardProps{
    Name: String,
    Description:String,
    Price: Number,
    ImgSource: any;
}
const Item_List_View: React.FC<CardProps> = ({Name,Description,Price,ImgSource})=> {
    
  return (

    <View style={{padding:8}}>
      <View style={[styles.container]}>
        <View style={[styles.box]}>
        <Image style={{width:"100%",height:"100%"}} source={ImgSource} />
        </View>
        <View style={{flexDirection:"column", justifyContent:"space-between",width:200}}>
        <Text style={[styles.TextStyle,{color:"black"}]}>{Name}</Text>
        <Text style={[styles.TextStyle,{color:"#9C9696",marginTop:21}]}>{Description}</Text>
        <Text style={[styles.TextStyle,{color:"red"}]}>{`${Price}`} VND</Text>
            
            <View style={{flexDirection:"row",justifyContent:"space-between",width:170 ,marginTop:11 }}>
                <Pressable style={[styles.button1]}>
                {/* <Image style={{width:21,height:21}} source={require('../../assets/icon/Date_range.png')} /> */}
                    <Text style={[styles.TextStyle,{color:"white"}]}> Đặt lịch</Text>
                </Pressable>
            
                <Pressable style={[styles.button1,{width:24,height:24,backgroundColor:"#EBEAEA"}]}>
                {/* <Image style={{width:"100%",height:"100%"}} source={require('../../assets/icon/Message_alt_fill.png')} /> */}
                </Pressable>
            </View>
        </View>
      </View>

    </View>
  )
}

export default Item_List_View

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:180,
        borderRadius:20,
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor:"#EBEAEA",
        alignItems:"center"
    },
    box:{
       borderRadius:100,
       width:120,
       height:120,
       overflow: "hidden",

    },
    button1:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:110,height:26,
        borderRadius:5,
        backgroundColor:"#489458"
    },
    TextStyle:{
        fontSize:12,

    }
})