import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';

const Item_View_Profile_2 = (data: any) => {
    const navigation = useNavigation<any>();
    const { userType } = useLocalSearchParams();

    const handleChange1 = () => {
        navigation.navigate('user_record_screen', { userType })

    }
    const handleChange2 = () =>{
        navigation.navigate('user_payment_screen', { userType })

    }
    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity
                 style={styles.option}
                 onPress={handleChange1}>
                    <FontAwesome name="user" size={20} color="#1A5828" style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text1}>Lịch sử khám</Text>
                        <View style={styles.underline} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.option}
                 onPress={handleChange2}>

                    <FontAwesome name="money" size={20} color="#1A5828" style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text1}>Lịch sử thanh toán</Text>
                        <View style={styles.underline} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Item_View_Profile_2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    options: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa các biểu tượng và văn bản
        justifyContent: 'center', // Căn giữa toàn bộ hàng
        marginVertical: 10, // Khoảng cách giữa các tùy chọn
    },
    icon: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1, // Chiếm không gian còn lại trong hàng
        justifyContent: 'center', // Căn giữa văn bản và đường gạch
        paddingVertical: 10,
    },
    text1: {
        color: 'black',
        marginLeft: 10,

    },
    underline: {
        borderBottomWidth: 1,
        borderColor: '#C9C4C4',
        marginTop: 5, // Khoảng cách giữa văn bản và đường gạch
        width: '100%', // Đường gạch dài bằng tùy chọn
    },
});
