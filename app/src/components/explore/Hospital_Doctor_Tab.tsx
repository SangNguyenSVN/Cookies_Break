import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Hospital_Doctor_Tab = ({ activeTab }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { setActiveIndex(0); activeTab('hospital') }}
                style={[activeIndex == 0 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex == 0 ? styles.activeText : styles.inActiveText]}>
                    Hospital
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setActiveIndex(1); activeTab('doctor') }}
                style={[activeIndex == 1 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex == 1 ? styles.activeText : styles.inActiveText]}>
                    Doctor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setActiveIndex(2); activeTab('clinic') }} // Thêm tab mới cho "Phòng khám"
                style={[activeIndex == 2 ? styles.activeTab : styles.inActiveTab]}
            >
                <Text style={[activeIndex == 2 ? styles.activeText : styles.inActiveText]}>
                    Clinic
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Hospital_Doctor_Tab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D9D9D9',
        paddingVertical: 5,
        borderRadius: 10,
        margin: 3
    },
    activeTab: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 30
    },
    inActiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeText: {
        color: '#489458', // Text màu xanh cho tab đang hoạt động
        fontWeight: 'bold',
    },
    inActiveText: {
        color: '#9C9696', // Text màu xám cho tab không hoạt động
    },
});
