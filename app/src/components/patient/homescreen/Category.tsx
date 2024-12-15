import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SubHeading from '@/app/src/shared/SubHeading';
import apiService from '@/app/src/services/apiService';

const Category = () => {
    const [cateLst, setCateLst] = useState<any[]>([]);
    const navigation = useNavigation<any>();
    const [showAll, setShowAll] = useState(false);

    // Hàm chuyển đổi trạng thái showAll
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Lấy dữ liệu danh mục từ API
    const getCategories = async () => {
        try {
            const response = await apiService.getDepartments();
            setCateLst(response.data);
        } catch (error) {
            console.trace(error);
            console.log('Error at Category component: getCategories');
        }
    };

    // Điều hướng đến màn hình danh sách bệnh viện theo chuyên mục
    const navigateToHospitals = (categoryName: string) => {
        navigation.navigate('hospital-doctor-list', { categoryName });
    };

    // Xử lý dữ liệu hiển thị dựa trên trạng thái showAll
    const displayedData = showAll ? cateLst : cateLst.slice(0, 3);

    // Hàm render từng item trong danh sách
    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigateToHospitals(item.name)} // Điều hướng khi nhấn
        >
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <SubHeading title="Category" />
                <TouchableOpacity onPress={toggleShowAll}>
                    <Text style={styles.toggleText}>{showAll ? 'Hide' : 'See All'}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                key={showAll ? '4-columns' : '3-columns'} 
                data={displayedData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}  
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleText: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '500',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    itemContainer: {
        alignItems: 'center',
        width: '30%', 
    },
    imageWrapper: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E0F7FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    categoryName: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
});
