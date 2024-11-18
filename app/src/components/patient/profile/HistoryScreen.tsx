import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import apiService from '@/app/src/services/apiService';
import { useAuth } from '@/app/src/hooks/useAuth';
import Header from '@/app/src/shared/Header';
import moment from 'moment';
import { useUser } from '@clerk/clerk-expo';

const HistoryScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);
    const { user } = useAuth();
    const idUser = user?.user?.id;
    const roleName = user?.role?.name;

    const getData = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            let response;
            if (roleName === 'doctor') {
                response = await apiService.getAppointmentByDoctor(idUser); // Fetch data for doctor
            } else if (roleName === 'patient') {
                response = await apiService.getAppointmentbyUser(idUser); // Fetch data for patient
            } else if (!roleName || roleName == null) {
                const { user } = useUser();
                const email: any = user?.primaryEmailAddress?.emailAddress
                response = await apiService.getAppointmentByEmail(email); 
            }

            setData(response?.data || []);
            console.log(response?.data);
        } catch (error: any) {
            console.log("Error in history screen: ", error.message);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        getData(); // Fetch data on component mount
    }, [idUser, roleName]); // Add roleName as a dependency

    const refresh = () => {
        getData(); // Function to refresh data
    };

    // Render loading state or appointment data
    const renderContent = () => {
        if (loading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

        if (data.length === 0) {
            return (
                <View>
                    <Text style={styles.noDataText}>No appointment history available.</Text>
                </View>
            )
        }

        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text>Id: {index + 1}</Text>
                        <Text style={styles.itemText}>Date: {moment(item.date).format('YYYY-MM-DD')}</Text>
                        <Text style={styles.itemText}>Time: {item.time}</Text>
                        {
                            item.patient?.fullname ?
                                <Text style={styles.itemText}>Patient: {item.patient?.fullname}</Text>
                                : <Text style={styles.itemText}>Patient: {item.fullname}</Text>

                        }
                        <Text style={styles.itemText}>Doctor: {item.doctor?.fullname}</Text>
                        <Text style={styles.itemText}>Status: {item.status?.name}</Text>
                    </View>
                )}
                refreshing={loading}
                onRefresh={refresh} // Pull to refresh
            />
        );
    };

    return (
        <View style={styles.container}>
            <Header title='Lịch sử khám' showBackButton={true} />
            {renderContent()}
        </View>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});
