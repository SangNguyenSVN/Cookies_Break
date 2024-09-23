import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, Text, View } from 'react-native'

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderRadius: 90,
            width: '95%',
            height: '7%',
            backgroundColor: '#00B2BF',
            marginBottom: 10,
            alignSelf: 'center',
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
                  color={focused ? "black" : "white"} />
                <Text style={[focused ? styles.onFocused_Title : styles.unFocused_Title]}>
                  Home
                </Text>
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
                  color={focused ? "black" : "white"} />
                <Text style={[focused ? styles.onFocused_Title : styles.unFocused_Title]}>
                  Explore
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBar_Item_Booking}>
                <FontAwesome
                  name="plus"
                  size={24}
                  color={focused ? "black" : "white"} />
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
                  color={focused ? "black" : "white"} />
                <Text style={[focused ? styles.onFocused_Title : styles.unFocused_Title]}>
                  History
                </Text>
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
                  color={focused ? "black" : "white"} />
                <Text style={[focused ? styles.onFocused_Title : styles.unFocused_Title]}>
                  Profile
                </Text>
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
    marginBottom: -40,

  },
  onFocused_Item: {
    // alignItems: 'center',
    // borderRadius: 90,
    // height: 65,
    // width: 65,
    // justifyContent: 'center',
    // backgroundColor: 'white'

  },
  onFocused_Title: {
    color: "black",
  },
  unFocused_Title: {
    color: 'white',
    fontSize: 12,

  },
  tabBar_Item_Booking: {
    alignItems: 'center',
    borderRadius: 90,
    borderWidth: 2,
    height: 65,
    width: 65,
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#00B2BF',
    position: 'absolute'
  }
})
