import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const DoctorItem_List_View = ({ data }: any) => {
    // Function to get initials from the fullname
    const getInitials = (name: string) => {
        const names = name.split(' ');
        const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
        return initials;
    };

    return (
        <View style={styles.container}>
            {data.image ? (
                <Image source={{ uri: data.image }} style={styles.image} />
            ) : (
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(data.fullname)}</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.name}>{data.fullname}</Text>
                <Text style={styles.specialty}>{data.specialty}</Text>
                <Text style={styles.hospital}>{data.hospital.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginVertical: 8,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,  // Increased image width
        height: 70, // Increased image height
        borderRadius: 35, // Adjusted borderRadius for larger image
        marginRight: 10,
    },
    avatar: {
        width: 70, // Same size as the image
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ddd', // Placeholder background color
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 24,
        color: '#fff', // White text color for contrast
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1, // This allows the text to take the remaining space
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    specialty: {
        fontSize: 14,
        color: '#777',
        marginTop: 4, // Adding some space above the specialty text
    },
    hospital: {
        fontSize: 14,
        color: '#555', // Slightly darker color for the hospital name
        marginTop: 2, // Add space above the hospital name
    },
});

export default DoctorItem_List_View;
