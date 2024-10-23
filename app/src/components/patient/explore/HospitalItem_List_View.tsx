// components/patient/explore/HospitalItem_List_View.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HospitalItem_List_View = ({ data }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.address}>{data.address}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginVertical: 8,
        elevation: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#555',
    },
    role: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    doctorName: {
        fontSize: 14,
        color: '#777',
    },
});

export default HospitalItem_List_View;
