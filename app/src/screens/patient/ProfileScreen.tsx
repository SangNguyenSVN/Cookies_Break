import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../shared/Header';
import { useAuth } from '../../hooks/useAuth'; // Import the useAuth hook

const ProfileScreen = () => {
    const { user, logout } = useAuth(); // Get the authenticated user and logout function from useAuth

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
            
            {/* <View style={styles.profileContainer}>
                {user ? (
                    <>
                        <Text style={styles.label}>Tên người dùng: {user.username}</Text>
                        <Text style={styles.label}>Số điện thoại: {user.phoneNumber}</Text>
                        <Text style={styles.label}>Vai trò: {user.role?.name}</Text>
                        
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.label}>Đang tải thông tin người dùng...</Text>
                )}
            </View> */}
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#489458',
    },
    profileContainer: {
        padding: 20,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginVertical: 5,
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#d9534f',
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
