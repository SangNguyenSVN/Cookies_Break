import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Share2 } from 'react-native-feather';

const NewsDetailScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            // Mô phỏng việc tải dữ liệu từ API
            const data: any = {
                id: id,
                title: '8 dấu hiệu cảnh báo bệnh tim mạch cần chú ý',
                content: 'Nội dung chi tiết về các dấu hiệu cảnh báo bệnh tim mạch...',
                image: 'https://example.com/image1.jpg',
                source: 'Bệnh viện Nhi Đồng 1',
                publishedAt: '2 giờ trước'
            };
            setNewsItem(data);
        };

        fetchNewsItem();
    }, [id]);

    if (!newsItem) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Đang tải...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft stroke="green" width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết tin tức</Text>
                <TouchableOpacity>
                    <Share2 stroke="green" width={24} height={24} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <Image source={{ uri: newsItem.image }} style={styles.image} />
                <Text style={styles.title}>{newsItem.title}</Text>
                <Text style={styles.metadata}>{newsItem.source} • {newsItem.publishedAt}</Text>
                <Text style={styles.body}>{newsItem.content}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    metadata: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default NewsDetailScreen;