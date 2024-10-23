import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item_Icon_List_View = () => {
  return (
    <View>
       
     <View style={[styles.Container]}>
            <View style={[styles.ContainerItemList]}>
            <Pressable style={[styles.ItemStyle,{borderTopLeftRadius:20}]}>
                <Image style={{marginTop:8,height:40}} source={require("../../../assets/icon/Doctor_Item.png")}/>
                <Text style={[styles.ItemTest]}>Bác sĩ</Text>
            </Pressable>
            <Pressable style={[styles.ItemStyle]}>
                <Image style={{marginTop:8,height:40}}source={require("../../../assets/icon/Home_Item.png")}/>
                <Text style={[styles.ItemTest]}>Phòng Khám</Text>
            </Pressable>
            <Pressable style={[styles.ItemStyle]}>
                <Image style={{marginTop:8,height:40}} source={require("../../../assets/icon/Hospital_Item.png")}/>
                <Text style={[styles.ItemTest]}>Bệnh viện</Text>
            </Pressable>
            <Pressable style={[styles.ItemStyle,{borderTopRightRadius:20}]}>
                <Image style={{marginTop:8,height:40}} source={require("../../../assets/icon/Vali_Item.png")}/>
                <Text style={[styles.ItemTest]}>Gói khám</Text>
            </Pressable>
            </View>
               {/*========================================================= */}
            <View style={[styles.ContainerItemList]}>
            <Pressable style={[styles.ItemStyle,{borderBottomLeftRadius:20}]}>
                <Image style={{marginTop:8,height:40}} source={require("../../../assets/icon/QA_Item.png")}/>
                <Text style={[styles.ItemTest]}>Hỏi đáp</Text>
            </Pressable>
            <Pressable style={[styles.ItemStyle]}>
                <Image style={{marginTop:8,height:40}}source={require("../../../assets/icon/Sick_Item.png")}/>
                <Text style={[styles.ItemTest]}>Bệnh</Text>
            </Pressable>
            <Pressable style={[styles.ItemStyle]}>
                <Image style={{marginTop:8,height:40}} source={require("../../../assets/icon/Medical_Item.png")}/>
                <Text style={[styles.ItemTest]}>Bệnh viện</Text>
            </Pressable>
            <Pressable style={[styles.ItemStyle,{borderBottomRightRadius:20}]}>
                <Image style={{marginTop:8,height:40}} source={require("../../../assets/icon/Search_Item.png")}/>
                <Text style={[styles.ItemTest]}>Gói khám</Text>
            </Pressable>
        
            </View>
     </View>
    </View>
  )
}

export default Item_Icon_List_View

const styles = StyleSheet.create({
    Container:{
        width:"92%",
        height:140,
        borderRadius:20,
        flexDirection:"column",
        backgroundColor:"white",
        // borderColor:"grey",
        // borderWidth:1,
        alignSelf:"center"
    },
    ItemStyle:{
        width:"25%",
        height:"100%",
        borderColor:"#C9C4C4",
        borderWidth:1,
        flexDirection:"column",
        alignItems:"center",
        
    },
    ContainerItemList:{
        width:"100%",
        height:"50%",
        flexDirection:"row",
    },
    ItemTest:{
        color:"black",
        fontWeight:"400",
        fontSize:12,

    }
})