import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, Text, View } from 'react-native'

export default function TabLayout() {

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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBar_Item}>
              <FontAwesome name="hospital-o"
                size={24}
                color={focused ? "#489458" : "#9C9696"} />

            </View>
          ),
        }}

      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBar_Item}>
              <FontAwesome
                name="search"
                size={24}
                color={focused ? "#489458" : "#9C9696"} />

            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBar_Item}>
              <FontAwesome
                name="plus"
                size={24}
                color={focused ? "#489458" : "#9C9696"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBar_Item}>
              <FontAwesome
                name="clock-o"
                size={24}
                color={focused ? "#489458" : "#9C9696"} />

            </View>

          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBar_Item}>
              <FontAwesome
                name="product-hunt"
                size={24}
                color={focused ? "#489458" : "#9C9696"} />
              {/* <Text style={[focused ? styles.onFocused_Title : styles.unFocused_Title]}>
                  Profile
                </Text> */}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBar_Item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  onFocused_Title: {

  },
  unFocused_Title: {

  },

});

