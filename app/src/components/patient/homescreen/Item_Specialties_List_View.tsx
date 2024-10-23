import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/src/navigation/patient/HomeNavigation';


// Define the navigation prop type
type NavigationProp = StackNavigationProp<RootStackParamList, 'user_hospital_screen'>;

const Item_Specialties_List_View = () => {
  
    const navigation = useNavigation<NavigationProp>();
  

    const navigateToHospitalScreen = (specialty: string) => {
        navigation.navigate('user_hospital_screen', { specialty });
    };

    return (
    <View>
     <View style={[styles.Container]}>
     <Pressable style={[styles.ItemContainer]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/coronary_care_unit.png")}/>
                <Text style={[styles.TextStyle]}>
                    Tim mạch
                </Text>
            </Pressable>
            <Pressable style={[styles.ItemContainer,{width:68}]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/virus.png")}/>
                <Text style={[styles.TextStyle]}>
                Ung bướu, 
                tuyến giáp
                </Text>
            </Pressable>
            <Pressable style={[styles.ItemContainer]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/Mental_Disorder.png")}/>
                <Text style={[styles.TextStyle]}>
                Nội thần kinh
                </Text>
            </Pressable>
            <Pressable style={[styles.ItemContainer]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/ears_nose_and_throat.png")}/>
                <Text style={[styles.TextStyle]}>
                Tai, mũi, họng
                </Text>
            </Pressable>
            
     </View>

     <View style={[styles.Container,{paddingTop:24}]}>
     <Pressable style={[styles.ItemContainer]} onPress={() => navigateToHospitalScreen("Cơ Xương Khớp")}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/joints.png")}/>
                <Text style={[styles.TextStyle]}>
                cơ xương khớp
                </Text>
            </Pressable>
            <Pressable style={[styles.ItemContainer,{width:68}]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/coughing.png")}/>
                <Text style={[styles.TextStyle,]}>
                Nhi
                </Text>
            </Pressable>
            <Pressable style={[styles.ItemContainer]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/liver.png")}/>
                <Text style={[styles.TextStyle]}>
                    Gan, mật, tuỵ
                </Text>
            </Pressable>
            <Pressable style={[styles.ItemContainer]}>
                <Image style={{width:35,height:35,alignSelf:"center"}} source={require("../../../assets/icon/teath.png")}/>
                <Text style={[styles.TextStyle]}>
                    Răng, hàm
                </Text>
            </Pressable>
            
     </View>
     
    </View>
  )
}

export default Item_Specialties_List_View

const styles = StyleSheet.create({
    Container:{
        flexDirection:"row",
        width:"92%",
       alignSelf:"center",justifyContent:"space-around"
    },
    ItemContainer:{
        flexDirection:"column",
        alignItems:"center",
        width:100
    },
    TextStyle:{
        fontSize:11,
        fontWeight:"400",alignSelf:"center"
    }
    
})