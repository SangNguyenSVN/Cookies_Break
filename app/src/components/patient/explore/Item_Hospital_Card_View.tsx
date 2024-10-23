import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface CardProps{
    Name: String,
    ImagePath: { uri: string };
}
const Item_Hospital_Card_View:React.FC<CardProps> = ({Name,ImagePath})=> {
    // <Pressable style={[styles.button1]}>
    //             <Image style={{width:21,height:21}} source={require('../../../assets/icon/Date_range.png')} />
    //                 <Text style={[styles.TextStyle,{color:"white"}]}> Đặt lịch</Text>
    //             </Pressable>
  return (
    <View>
        <View style={{height:15}}></View>
     <View style={[styles.Container]}>
        <View style={[styles.ContainerColumn]}>
        <View style={[styles.ContainerRow,{justifyContent:"space-around",paddingTop:6}]}>
            <Image style={{width:117,height:100}} source={ImagePath} />
            <View style={[styles.ContainerColumn,{justifyContent:"space-around"}]}>
                <Text style={[styles.TextStyleBigger]}>{Name}</Text>
                <View style={[styles.ContainerRow,{justifyContent:"space-around",alignItems:"center"}]}>
                    <Pressable style={[styles.button1]}>
                    <Image style={{width:21,height:21}} source={require('../../../assets/icon/Date_range.png')} />
                        <Text style={[styles.TextStyle,{color:"white"}]}> Đặt lịch</Text>
                    </Pressable>
                    <Pressable>
                    <Image style={{width:24,height:24}} source={require('../../../assets/icon/thumb_up.png')} />
                    </Pressable>
            </View>
            </View>
            </View>
            <View style={[styles.ContainerRow,{alignItems:"center",justifyContent:"space-around",borderTopWidth:1,borderColor:"white",marginTop:10}]}>
            <Image style={{width:21,height:21}} source={require('../../../assets/icon/address.png')} />
            <Text style={[styles.TextDirectionStyle,{width:320}]}>Bệnh viện Đa khoa Quốc tế Vinmec Central Park ,208 Đ. Nguyễn Hữu Cảnh, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh</Text>
            </View>
        </View>
     </View>
    </View>
  )
}

export default Item_Hospital_Card_View

const styles = StyleSheet.create({
    Container:{width:"92%",
        height:150,
        backgroundColor:"#EBEAEA",
    
        flexDirection:'column'
        ,alignSelf:"center"
    },
    ContainerRow:{
        flexDirection:"row"
    },
    ContainerColumn:{
        flexDirection:"column"
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

    },TextStyleBigger:{
        fontSize:15,
        fontWeight:"400"
    },
    TextDirectionStyle:{
        fontSize:8,
        fontWeight:"400"
    }
})