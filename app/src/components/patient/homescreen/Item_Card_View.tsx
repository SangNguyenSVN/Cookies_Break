import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item_Card_View = () => {
  return (
<<<<<<< HEAD
    <View style={{padding:8}}>
      <View style={[styles.container]}>
        <View style={[styles.box]}>
        {/* <Image style={{width:"100%",height:"100%"}} source={ImgSource} /> */}
        </View>
        <View style={{flexDirection:"column", justifyContent:"space-between",width:200}}>
        <Text style={[styles.TextStyle,{color:"black"}]}>{Name}</Text>
        <Text style={[styles.TextStyle,{color:"#9C9696",marginTop:21}]}>{Description}</Text>
        
            
            <View style={{flexDirection:"row",justifyContent:"space-between",width:170 ,marginTop:11 }}>

                <Pressable style={[styles.button1]}>
                <Image style={{width:21,height:21}} source={require('../../../assets/icon/Date_range.png')} />

                {/* <Pressable style={[styles.button1]}>
                <Image style={{width:21,height:21}} source={require('../../assets/icon/Date_range.png')} />
>>>>>>> 4d909c0aed7a1f83a31a1f522a3720fdf1b4a2b4
=======
                {/* <Pressable style={[styles.button1]}>
                <Image style={{width:21,height:21}} source={require('../../assets/icon/Date_range.png')} />
=======
                <Pressable style={[styles.button1]}>
                <Image style={{width:21,height:21}} source={require('../../../assets/icon/Date_range.png')} />
>>>>>>> f031cfe18ce236131c7db6e19772888c54d204ac
>>>>>>> 7d7f31ca58faccf98480597caa8bdebd9b91f6c1
                    <Text style={[styles.TextStyle,{color:"white"}]}> Đặt lịch</Text>*/}
                </Pressable> 

                <Pressable style={[styles.button1,{width:24,height:24,backgroundColor:"#EBEAEA"}]}>
                <Image style={{width:"100%",height:"100%"}} source={require('../../../assets/icon/Message_alt_fill.png')} />
                </Pressable>

                {/* <Pressable style={[styles.button1,{width:24,height:24,backgroundColor:"#EBEAEA"}]}>
                <Image style={{width:"100%",height:"100%"}} source={require('../../assets/icon/Message_alt_fill.png')} />
                </Pressable> */}

                {/* <Pressable style={[styles.button1,{width:24,height:24,backgroundColor:"#EBEAEA"}]}>
                <Image style={{width:"100%",height:"100%"}} source={require('../../assets/icon/Message_alt_fill.png')} />
                </Pressable> */}

                <Pressable style={[styles.button1,{width:24,height:24,backgroundColor:"#EBEAEA"}]}>
                <Image style={{width:"100%",height:"100%"}} source={require('../../../assets/icon/Message_alt_fill.png')} />
                </Pressable>

            </View>
        </View>
      </View>
=======
    <View>
      <Text>Item_Card_View</Text>
>>>>>>> 166a9e7f2178669a1bab7a94ddfe4ddc4d748a9b
    </View>
  )
}

export default Item_Card_View

const styles = StyleSheet.create({})