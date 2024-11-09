import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Appointment_Tab = ({ activeTab }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Define the tab items, which can be easily extended if needed
    const tabs = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chờ khám', value: 'chờ khám' },
        { label: 'Đã thanh toán', value: 'đã thanh toán' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        setActiveIndex(index); // Set the active index
                        activeTab(tab.value); // Pass the tab value to the parent
                    }}
                    style={[
                        activeIndex === index ? styles.activeTab : styles.inActiveTab,
                    ]}
                >
                    <Text
                        style={[
                            activeIndex === index ? styles.activeText : styles.inActiveText,
                        ]}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Appointment_Tab;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D9D9D9',
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 5,
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
