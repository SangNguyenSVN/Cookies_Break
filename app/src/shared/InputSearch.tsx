import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const InputSearch = ({ searchQuery, setSearchQuery }: any) => {
    return (
        <View style={styles.searchBar}>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    )
}

export default InputSearch

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        margin: 10,
        padding: 10, 
        borderRadius: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
})
