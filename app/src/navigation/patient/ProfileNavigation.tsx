import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../../screens/patient/ProfileScreen';
import ProfileSetting from '../../shared/screens/ProfileSetting';
import ChangePassword from '../../shared/screens/ChangePassword';
import HistoryScreen from '../../components/patient/profile/HistoryScreen';
import PaymentHistoryScreen from '../../components/patient/profile/PaymentHistoryScreen';
import PaymentDetailScreen from '../../components/patient/profile/PaymentDetailScreen';
import History_Detail from '../../components/patient/profile/History_Detail';
import Payment_Method_Screen from '../../components/patient/profile/Payment_Method_Screen';
import Service_Screen from '../../components/patient/profile/Service_Screen';
 

const ProfileNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='user_profile_screen' component={ProfileScreen} />
            <Stack.Screen name='user_profile_setting_screen' component={ProfileSetting} />
            <Stack.Screen name='user_change_password_screen' component={ChangePassword}/>
            <Stack.Screen name='user_record_screen' component={HistoryScreen}/>
            <Stack.Screen name='user_history_detail' component={History_Detail}/>
            <Stack.Screen name='user_payment_screen' component={PaymentHistoryScreen}/>
            <Stack.Screen name="user_detail_payment" component={PaymentDetailScreen} />
            <Stack.Screen name="payment_method_screen" component={Payment_Method_Screen}/>
            <Stack.Screen name="service_screen" component={Service_Screen}/>
        </Stack.Navigator>
    )
}

export default ProfileNavigation

const styles = StyleSheet.create({})