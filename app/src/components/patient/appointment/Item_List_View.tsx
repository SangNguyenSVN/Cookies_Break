// components/patient/explore/HospitalItem_List_View.js

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const HospitalItem_List_View = ({ data }: { data: any }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: data.image }} style={styles.image} />
                <Text style={styles.name}>{data.name}</Text>
            </View>
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
    imageContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    name: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        color: 'white', // Change color to contrast with the image
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 5,
    },
    address: {
        fontSize: 14,
        color: '#555',
    },
});

export default HospitalItem_List_View;
