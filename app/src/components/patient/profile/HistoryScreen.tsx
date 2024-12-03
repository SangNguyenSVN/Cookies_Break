import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import apiService from '@/app/src/services/apiService';
import { useAuth } from '@/app/src/hooks/useAuth';
import { useUser } from '@clerk/clerk-expo';
import Header from '@/app/src/shared/Header';
import moment from 'moment';
import InputSearch from '@/app/src/shared/InputSearch';
import Appointment_Tab from '../../doctor/ExploreScreen/Appointment_Tab';

const HistoryScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('all'); // Trạng thái tab hiện tại

    const { user } = useAuth();
    const { user: userClerk } = useUser();

    const idUser = user?.user?.id;
    const roleName = user?.role?.name;

    const getData = async () => {
        setLoading(true);
        setError(null);
        try {
            let response: any;
            if (roleName === 'doctor') {
                response = await apiService.getAppointmentByDoctor(idUser);
            } else if (roleName === 'patient') {
                response = await apiService.getAppointmentbyUser(idUser);
            } else if (userClerk) {
                const email: any = userClerk?.primaryEmailAddress?.emailAddress;
                response = await apiService.getAppointmentByEmail(email);
            }
            setData(response?.data);
        } catch (err: any) {
            console.error('Error in HistoryScreen:', err.response?.status, err.response?.data, err.message);
            setError('Không thể tải dữ liệu, vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [idUser, roleName]);

    const refresh = () => {
        getData();
    };

    // Lọc dữ liệu dựa trên tab hiện tại và chuỗi tìm kiếm
    const filteredData = (data || [])
        .filter((item: any) => {
            if (activeTab !== 'all' && item.status?.name !== activeTab) {
                return false;
            }
            return (
                item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.time.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

    const renderAppointmentItem = ({ item, index }: { item: any; index: number }) => (
        <View style={styles.item}>
            <Text style={styles.itemId}>ID {index + 1}</Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Ngày: </Text>
                {moment(item.date).format('DD-MM-YYYY')}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Giờ: </Text>
                {item.time}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Tên bệnh nhân: </Text>
                {item.patient?.fullname || item.fullname || 'Đang cập nhật'}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Tên bác sĩ: </Text>
                {item.doctor?.fullname || 'Đang cập nhật'}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Trạng thái: </Text>
                {item.status?.name || 'Đang cập nhật'}
            </Text>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
                {searchQuery
                    ? 'Không tìm thấy lịch khám phù hợp.'
                    : 'Không tìm thấy lịch khám phù hợp.'}
            </Text>
        </View>
    );

    const renderErrorState = () => (
        <View style={styles.errorState}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Lịch sử khám" showBackButton={true} />
            <InputSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Tìm kiếm theo tên bệnh nhân, bác sĩ hoặc trạng thái"
            />
            <Appointment_Tab activeTab={setActiveTab} />

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#4caf50" />
                </View>
            ) : error ? (
                renderErrorState()
            ) : (
                <FlatList
                    data={filteredData} // Dữ liệu đã lọc
                    keyExtractor={(item) => item._id}
                    renderItem={renderAppointmentItem}
                    refreshing={loading}
                    onRefresh={refresh}
                    ListEmptyComponent={renderEmptyState}
                />
            )}
        </View>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    emptyStateText: {
        marginTop: 20,
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
    },
    errorState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#ff5252',
        textAlign: 'center',
    },
    item: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2,
    },
    itemId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 4,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
    },
});
