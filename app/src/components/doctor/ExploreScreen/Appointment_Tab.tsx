import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

// Define the props interface for TypeScript
interface AppointmentTabProps {
    activeTab: (value: string) => void; // Function to handle active tab value
}

const AppointmentTab: React.FC<AppointmentTabProps> = ({ activeTab }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Tabs configuration
    const tabs = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chờ khám', value: 'chờ khám' },
        { label: 'Đã thanh toán', value: 'đã thanh toán' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isActive = activeIndex === index;

                return (
                    <TouchableOpacity
                        key={tab.value}
                        onPress={() => {
                            setActiveIndex(index); // Update active index
                            activeTab(tab.value); // Notify parent component
                        }}
                        style={[
                            styles.tab,
                            isActive ? styles.activeTab : styles.inactiveTab,
                        ]}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isActive }}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                isActive ? styles.activeText : styles.inactiveText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                        
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default AppointmentTab;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E0E0E0',
        padding: 8,
        borderRadius: 20,
        marginHorizontal: 10,
        elevation: 3, // Shadow effect
    },
    tab: {
        flex: 1, // Đảm bảo mỗi tab chiếm khoảng cách đều
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginHorizontal: 5,
        height: 35,
        
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        elevation: 2, // Subtle shadow for active tab
    },
    inactiveTab: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeText: {
        color: '#4CAF50', // Bright green for active tab text
    },
    inactiveText: {
        color: '#7E7E7E', // Softer gray for inactive tab text
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        width: '70%', // Đảm bảo chiều dài cố định
        height: 2,
        backgroundColor: '#4CAF50', // Màu hiệu ứng
        borderRadius: 1,
    },
});
