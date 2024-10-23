import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Search, Menu } from 'react-native-feather';

const NewsFeedScreen = ({ navigation }: any) => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        // Mô phỏng việc tải dữ liệu từ API
        const fetchNewsData = async () => {
            // Trong ứng dụng thực tế, bạn sẽ gọi API ở đây
            const data: any = [
                { id: 1, title: '8 dấu hiệu cảnh báo bệnh tim mạch...', description: 'Bệnh viện Nhi Đồng 1 Phần 1', image: 'https://via.placeholder.com/100' },
                { id: 2, title: 'Cách chăm sóc trẻ sơ sinh đúng cách', description: 'Bệnh viện Nhi Đồng 2', image: 'https://via.placeholder.com/100' },
                { id: 3, title: 'Những dấu hiệu bệnh lý cần lưu ý', description: 'Bệnh viện Chợ Rẫy', image: 'https://via.placeholder.com/100' },
                { id: 4, title: 'Lời khuyên cho bệnh nhân tim mạch', description: 'Bệnh viện Tim Tâm Đức', image: 'https://via.placeholder.com/100' },
                // Thêm các mục tin tức khác ở đây
            ];
            setNewsData(data);
        };

        fetchNewsData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Menu stroke="white" width={24} height={24} />
                <Text style={styles.headerTitle}>Tin tức</Text>
                <Search stroke="white" width={24} height={24} />
            </View>

            <ScrollView>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Search stroke="gray" width={20} height={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2196F3' }]}>
                        <Text style={styles.actionButtonText}>Thông tin sức khỏe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#9C27B0' }]}>
                        <Text style={styles.actionButtonText}>Cẩm nang tiêm chủng</Text>
                    </TouchableOpacity>
                </View>

                {/* Featured Image */}
                <View style={styles.featuredImageContainer}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/400x200' }} // URL hình ảnh nổi bật
                        style={styles.featuredImage}
                    />
                    <View style={styles.featuredTextOverlay}>
                        <Text style={styles.featuredText}>5 địa chỉ khám xương khớp tốt tại TPHCM</Text>
                    </View>
                </View>

                {/* Categories */}
                <ScrollView horizontal style={styles.categoriesContainer}>
                    {['Bệnh và nội', 'Trẻ sơ sinh', 'Tim mạch', 'Tai mũi họng', 'Cơ xương khớp'].map((category) => (
                        <TouchableOpacity key={category} style={styles.categoryButton}>
                            <Text style={styles.categoryButtonText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* News List */}
                {newsData.map((item: any) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.newsItem}
                        onPress={() => navigation.navigate('NewsDetail', { id: item.id })}
                    >
                        <Image source={{ uri: item.image }} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <Text style={styles.newsDescription}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#4CAF50',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        margin: 16,
        padding: 8,
        borderRadius: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    featuredImageContainer: {
        height: 200,
        marginBottom: 16,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredTextOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
    },
    featuredText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    categoryButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
    },
    categoryButtonText: {
        color: '#333',
    },
    newsItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    newsImage: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    newsContent: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    newsDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default NewsFeedScreen;
