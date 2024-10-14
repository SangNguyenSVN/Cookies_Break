import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Hospital_Doctor_Tab = ({ activeTab }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { setActiveIndex(0); activeTab('hospital'); }}
                style={[activeIndex === 0 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex === 0 ? styles.activeText : styles.inActiveText]}>
                    Hospital
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setActiveIndex(1); activeTab('doctor'); }}
                style={[activeIndex === 1 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex === 1 ? styles.activeText : styles.inActiveText]}>
                    Doctor
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Hospital_Doctor_Tab;

const styles = StyleSheet.create({
    container: {
        width: '100%', // Set width to 100% to fill the container
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D9D9D9',
        paddingVertical: 5,
        borderRadius: 10,
        margin: 3,
        // Remove flex: 1 to avoid taking up entire screen height
    },
    activeTab: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 40, // Adjust height as needed
    },
    inActiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeText: {
        color: '#489458', // Green text for active tab
        fontWeight: 'bold',
    },
    inActiveText: {
        color: '#9C9696', // Gray text for inactive tabs
    },
});
