import Header from '@/app/src/shared/Header';
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Package_List_View = ({ route, navigation }: { route: any, navigation: any }) => {
    const { hospital } = route.params; // Nhận thông tin bệnh viện từ route
    const packages = hospital?.packages || []; // Gán giá trị mặc định nếu packages bị undefined
    console.log(hospital);
    
    const handleSelectPackage = (pkg: any) => {
        navigation.navigate('doctor_booking_screen', { hospital, selectedPackage: pkg });
    };

    return (
        <View style={styles.container}>
            <Header title='Gói khám' showBackButton={true}/>
            {packages.length > 0 ? (
                <FlatList
                    data={packages} // Dữ liệu các gói khám
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectPackage(item)} style={styles.packageItem}>
                            <Text style={styles.packageName}>{item.name}</Text>
                            <Text>Giá: {item.price} VND</Text>
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text>Không có gói khám nào</Text>
            )}
        </View>
    );
};

export default Package_List_View;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    packageItem: {
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 15,
    },
    packageName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
