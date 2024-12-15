import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Item_List_View from '../../components/patient/news/Item_List_View';
import apiService from '../../services/apiService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../../shared/Header';
import InputSearch from '../../shared/InputSearch';

const NewsFeedScreen = () => {
    const [newsData, setNewsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<any>();
    const [refreshing, setRefreshing] = useState(false); // Trạng thái làm mới

    // Hàm lấy dữ liệu tin tức
    const getNews = async () => {
        try {
            const response: any = await apiService.getNews();
            setNewsData(response.data);
            console.log("Tin tức: ", response.data);
        } catch (error) {
            console.error("Không có dữ liệu tin tức:", error);
        }
    };

    // Hàm làm mới dữ liệu
    const onRefresh = async () => {
        setRefreshing(true);
        await getNews(); // Lấy lại dữ liệu
        setRefreshing(false); // Đặt trạng thái làm mới là false
    };

    useFocusEffect(
        useCallback(()=>{
            getNews();
        },[])
    )

    const renderNewsItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', { newsItem: item })}>
            <Item_List_View data={item} />
        </TouchableOpacity>
    );

    // Hàm lọc dữ liệu theo từ khóa tìm kiếm
    const filteredNewsData = newsData.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Header title='Tin tức' showBackButton={false} />
            <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                keyExtractor={(item: any) => item._id} // Thêm keyExtractor để sử dụng ID làm khóa
                data={filteredNewsData}
                renderItem={renderNewsItem}
                contentContainerStyle={{ paddingBottom: 16 }}
                onRefresh={onRefresh} // Gọi hàm làm mới khi kéo xuống
                refreshing={refreshing} // Trạng thái làm mới
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});

export default NewsFeedScreen;
