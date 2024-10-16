import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../shared/Header';
import { useAuth } from '../../hooks/useAuth';
import Item_View_Profile_1 from '../../components/patient/profile/Item_View_Profile_1';
import Item_View_Profile_2 from '../../components/patient/profile/Item_View_Profile_2';
import Item_View_Profile_3 from '../../components/patient/profile/Item_View_Profile_3';

const ProfileScreen = () => {
    const { user } = useAuth();

    console.log(user)
    return (
        <View style={styles.container}>
            <Header title="Thông tin tài khoản" showBackButton={false} />
            <ScrollView>
                <View style={styles.item}>
                    <Item_View_Profile_1 data={user} />
                    <Item_View_Profile_2 data={user} />
                    <Item_View_Profile_3 />
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        gap: 40,
    },
});
