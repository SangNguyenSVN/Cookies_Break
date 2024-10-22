import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubHeading = ({ title, press }: any) => {
    return (
        <View>
            <View style={styles.viewtxt}>
                <Text style={styles.txt1}>{title}</Text>
            </View>
        </View>
    )
}

export default SubHeading

const styles = StyleSheet.create({
    viewtxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 7,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    txt1: {
        fontSize: 23,
        fontWeight: 'heavy',
    },
    txt2: {
        color: 'blue',
        fontSize: 18
    },
   
})