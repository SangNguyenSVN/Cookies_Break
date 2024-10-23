import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Item_Hospital_Card_View from '../../components/patient/explore/Item_Hospital_Card_View';

import Header from '../../shared/Header'
import Search from '../../components/patient/explore/Search';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/patient/HomeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

// Adjust path accordingly

type HospitalScreenProps = {
    route: RouteProp<RootStackParamList, 'user_hospital_screen'>; // Correct type for route
};
interface Hospital {
    _id: string;
    name: string;
    location: string;
    phoneNumber: string;
    doctors: string[]; 
    departments: string[]; 
    medicines: string[]; 
    packages: string[]; 
    image: string;
}

const HospitalScreen: React.FC<HospitalScreenProps> = ({ route }) => {
    const { specialty } = route.params;
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHospitals = async () => {
        try {
           
            const response = await axios.get(`http://192.168.1.13:3000/apis/hospital/derpartment/${specialty}`);
            
            setHospitals(response.data); 
            console.log("DỮ liệu",response)
            timeout: 10000
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            Alert.alert('Error fetching hospitals',);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    return (
        <View>
        
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={hospitals}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10 }}>
                           <Item_Hospital_Card_View
                           Name={item.name}
                           ImagePath={{ uri: item.image }}
                           />
                        </View>
                    )}
                    ListHeaderComponent={           <View>
                           <Header title={"Hospital screen"} showBackButton={true}/> 
                          
                          <View style={[styles.Bg]}><Search/></View>
                    </View>        }   
                />
            )}
        </View>
    );
};

export default HospitalScreen;

const styles = StyleSheet.create({
    Bg: {
        alignItems: 'center',
        backgroundColor: '#489458', 
        paddingBottom: 18,
            paddingTop:20
    },
});
