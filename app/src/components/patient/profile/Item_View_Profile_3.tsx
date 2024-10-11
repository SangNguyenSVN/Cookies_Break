import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Import FontAwesome for icons
import Logout from '@/app/src/shared/Logout';

const Item_View_Profile_3 = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.option}>
                    <FontAwesome name="file-text" size={20} color="black" style={styles.icon} />
                    <Text style={styles.text1}>
                        Điều khoản dịch vụ
                    </Text>
                </TouchableOpacity>
                <View style={styles.option}>
                <FontAwesome name="user-times" size={20} color="black" style={styles.icon} />

                    <Logout />
                </View>
            </View>
        </View>
    );
}

export default Item_View_Profile_3;

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
        alignItems: 'center', // Căn giữa biểu tượng và văn bản
        marginVertical: 10, // Khoảng cách giữa các tùy chọn
    },
    icon: {
        marginRight: 10, // Khoảng cách giữa biểu tượng và văn bản
    },
    text1: {
        color: 'black',
    },
});
