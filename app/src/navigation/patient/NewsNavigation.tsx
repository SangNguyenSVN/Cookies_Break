import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NewsDetailScreen from '../../components/patient/news/NewDetailScreen';
import NewsFeedScreen from '../../screens/patient/NewsScreen';

const NewsNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  )
}

export default NewsNavigation

const styles = StyleSheet.create({})