import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const HospitalItem_List_View = ({ data }: any) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: data.image }} style={styles.image} imageStyle={styles.imageBorder}>
                <View style={styles.overlay}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.address}>{data.location}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150, // Adjust height as needed
        borderRadius: 10,
        overflow: 'hidden', // Ensures image respects border radius
        marginVertical: 8,
        elevation: 1,
        margin: 10
    },
    image: {
        flex: 1,
        borderRadius: 10, // Apply borderRadius here to include all corners
        justifyContent: 'flex-end', // Position overlay at the bottom
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for readability
        padding: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    address: {
        fontSize: 14,
        color: '#ddd',
    }
});

export default HospitalItem_List_View;
