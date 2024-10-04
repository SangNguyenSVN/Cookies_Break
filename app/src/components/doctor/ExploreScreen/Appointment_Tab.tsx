import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Appointment_Tab = ({ activeTab }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { setActiveIndex(0); activeTab('all'); }} // Changed to 'all'
                style={[activeIndex === 0 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex === 0 ? styles.activeText : styles.inActiveText]}>
                    All
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setActiveIndex(1); activeTab('chua thanh toan'); }} // Changed to 'unpaid'
                style={[activeIndex === 1 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex === 1 ? styles.activeText : styles.inActiveText]}>
                    Chưa thanh toán
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setActiveIndex(2); activeTab('da thanh toan'); }} // Changed to 'paid'
                style={[activeIndex === 2 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex === 2 ? styles.activeText : styles.inActiveText]}>
                    Đã thanh toán
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Appointment_Tab;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D9D9D9',
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal:5
    },
    activeTab: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 30,
    },
    inActiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeText: {
        color: '#489458', // Green color for active tab text
        fontWeight: 'bold',
    },
    inActiveText: {
        color: '#9C9696', // Gray color for inactive tab text
    },
});
