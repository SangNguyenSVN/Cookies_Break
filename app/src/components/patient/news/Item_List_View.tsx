import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Item_List_View = ({ data }: any) => {
    return (
        <View style={styles.newsItem}>
            {data.sections[1].url && (
                <Image
                    source={{ uri: data.sections[1].url }}
                    style={styles.newsImage}
                />
            )}
            <Text style={styles.newsTitle}>{data.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    newsItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    newsImage: {
        width: '100%',
        height: 200,
        marginBottom: 8,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Item_List_View;
