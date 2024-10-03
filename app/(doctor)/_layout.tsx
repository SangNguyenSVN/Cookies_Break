import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 80, 
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#EAEAEA',
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    paddingBottom: 5, // Optional: Adjust padding if needed
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '', // Set to empty
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabBar_Item}>
                            <FontAwesome
                                name="hospital-o"
                                size={25} // Adjusted icon size
                                color={focused ? "#489458" : "#9C9696"}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: '', // Set to empty
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabBar_Item}>
                            <FontAwesome
                                name="search"
                                size={25} // Adjusted icon size
                                color={focused ? "#489458" : "#9C9696"}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: '', // Set to empty
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabBar_Item}>
                            <FontAwesome
                                name="user"
                                size={25} // Adjusted icon size
                                color={focused ? "#489458" : "#9C9696"}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
};

export default _layout;

const styles = StyleSheet.create({
    tabBar_Item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, // This ensures the item occupies the available space evenly
    },
});
