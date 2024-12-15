import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/src/navigation/patient/HomeNavigation';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';


// Define the navigation prop type
type NavigationProp = StackNavigationProp<RootStackParamList, 'user_hospital_screen'>;
interface IDepartment {
    _id: string; // Optional ID field (automatically generated)
    name: string; // Required name of the department
    description?: string; // Optional description of the department
    image: string; // Required path to the department's image
    createdAt?: Date; // Optional field for creation timestamp
    updatedAt?: Date; // Optional field for last updated timestamp
}
const Item_Specialties_List_View = () => {
  const [Specialities, setSpecialities] = useState<IDepartment[]>([])
    const navigation = useNavigation<NavigationProp>();
  

    const navigateToHospitalScreen = (specialty: string) => {
        navigation.navigate('user_hospital_screen', { specialty });
    };
    const fetchSpecialist = async () => {
        try {
            const response = await axios.get(`http://192.168.1.10:3001/apis/department/departments`);
           
                setSpecialities(response.data);
                console.log("Dữ liệu:", response.data);
                timeout: 10000
        } catch (error) {
            console.error("Error occurred:", error);
            
        } 
    };

    useEffect(() => {
        fetchSpecialist();
    }, []);
    const renderItem = ({ item }: { item: IDepartment }) => (
        <Pressable key={item._id} style={styles.itemContainer} onPress={() => navigateToHospitalScreen(item.name)}>
            <Image style={styles.image} source={require("../../../assets/icon/liver.png")} />
            <Text style={styles.textStyle}>{item.name}</Text>
        </Pressable>
    );
    return (
        <View style={[styles.containerr]}>
        <FlatList
            data={Specialities}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
        horizontal={true}
        />
    </View>

  )
}

export default Item_Specialties_List_View

const styles = StyleSheet.create({
    containerr:{
width:'100%',
alignItems:"center"

    },
    container: {
     
        
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    itemContainer: {
        flexDirection: "column",
        alignItems: "center",
        width:50,
        paddingHorizontal: 50,
        marginBottom: 16,
    },
    textStyle: {
        fontSize: 11,
        fontWeight: "400",
        alignSelf: "center",
        textAlign: "center", // Center text
    },
    image: {
        width: 35,
        height: 35,
        alignSelf: 'center',
    },
    
})