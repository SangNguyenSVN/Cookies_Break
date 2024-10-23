import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Header from '../../../shared/Header'
const NewsDetailScreen = ({ route }: any) => {
    const { newsItem } = route.params;

    // Kiểm tra dữ liệu
    const sections = newsItem.sections || []; // Sử dụng mảng rỗng nếu sections undefined

    return (
        <View style={styles.container}>
            <Header title='Thông tin' showBackButton={true} />
            <View style={styles.detailContainer}>
                <Text style={styles.title}>{newsItem.title}</Text>
                {sections.length > 0 ? (
                    <FlatList
                        data={sections}
                        keyExtractor={(item, index) => index.toString()} // Sử dụng chỉ số như key
                        renderItem={({ item }) => {
                            // Kiểm tra nếu item có giá trị
                            if (item) {
                                if (item.type === 'text') {
                                    return (
                                        <Text style={styles.textContent}>
                                            {item.content}
                                        </Text>
                                    );
                                } else if (item.type === 'image' && item.url) {
                                    return (
                                        <Image
                                            source={{ uri: item.url }}
                                            style={styles.imageContent}
                                        />
                                    );
                                }
                            }
                            return null; // Trả về null nếu không hợp lệ
                        }}
                    />
                ) : (
                    <Text style={styles.noData}>Không có dữ liệu để hiển thị</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailContainer:{
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    textContent: {
        fontSize: 16,
        marginBottom: 12,
    },
    imageContent: {
        width: '100%',
        height: 200,
        marginBottom: 12,
        resizeMode: 'cover',
    },
    noData: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});

export default NewsDetailScreen;
