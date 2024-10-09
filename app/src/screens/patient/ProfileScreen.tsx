import { StyleSheet, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../shared/Header';
import { useAuth } from '../../hooks/useAuth'; 
import Item_View_Profile_1 from '../../components/patient/profile/Item_View_Profile_1';

const ProfileScreen = () => { 
    const { user, logout } = useAuth(); 
    console.log(user)// Get the authenticated user and logout function from useAuth
    console.log(user)
    // This function will handle logout
    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function from useAuth
            console.log('User logged out');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Thông tin tài khoản" showBackButton={false} />
            <View style={styles.item}>
                {/* Truyền user vào Item_View_Profile_1 */}
                <Item_View_Profile_1 data={user} />
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#489458',
    },
    item: {
        marginHorizontal: 10,
    },
});
