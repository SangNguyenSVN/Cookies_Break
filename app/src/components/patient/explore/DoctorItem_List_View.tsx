// components/patient/explore/DoctorItem_List_View.js

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const DoctorItem_List_View = ({ data }: any) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: data.image }} style={styles.image} />
            <Text style={styles.name}>{data.name}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 14,
        color: '#777',
    },
});

export default DoctorItem_List_View;
