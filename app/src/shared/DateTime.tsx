import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getTimes, getDays } from '../services/dayTime'; // Ensure correct import path

const DateTimeForm = ({ onDaySelected, onHourSelected }: any) => {
    const [nextSevenDays, setNextSevenDays] = useState([]);
    const [hourOfDay, setHourOfDay] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

    useEffect(() => {
        const days: any = getDays(); // Get days data
        const times: any = getTimes(); // Get times data
        setNextSevenDays(days);
        setHourOfDay(times);
    }, []);

    const toggleDaySelection = (item: any) => {
        if (selectedDay === item.date) {
            setSelectedDay(null);
            onDaySelected(null);
        } else {
            setSelectedDay(item.date);
            onDaySelected(item.date);
        }
    };

    const toggleHourSelection = (item: any) => {
        if (selectedHour === item.time) {
            setSelectedHour(null);
            onHourSelected(null);
        } else {
            setSelectedHour(item.time);
            onHourSelected(item.time);
        }
    };

    const renderItemDay = ({ item }: any) => (
        <View style={styles.itemListView}>
            <TouchableOpacity
                style={[selectedDay === item.date ? styles.btnItem_Selected : styles.btnItem]}
                onPress={() => toggleDaySelection(item)}
            >
                <Text style={styles.days}>{item.day}</Text>
                <Text style={styles.dates}>{item.formattedDate}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItemTime = ({ item }: any) => (
        <View style={styles.itemListView}>
            <TouchableOpacity
                style={[selectedHour === item.time ? styles.btnItem_Selected : styles.btnItem]}
                onPress={() => toggleHourSelection(item)}
            >
                <Text style={styles.times}>{item.time}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <View style={styles.viewItem_Form}>
                <FlatList
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    data={nextSevenDays}
                    renderItem={renderItemDay}
                />
            </View>
            <View style={styles.viewItem_Form}>
                <FlatList
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    data={hourOfDay}
                    renderItem={renderItemTime}
                />
            </View>
        </View>
    );
};

export default DateTimeForm;

const styles = StyleSheet.create({
    viewItem_Form: {
        marginVertical: 10,
    },
    itemListView: {
        height: 50,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        backgroundColor: 'white',
    },
    btnItem_Selected: {
        height: 50,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 10,
        backgroundColor: '#00B2BF',
    },
    days: {
        fontSize: 16,
        alignSelf: 'center',
    },
    dates: {
        fontSize: 16,
    },
    times: {
        alignSelf: 'center',
        fontSize: 16,
    },
    btnItem: {
        // Add styles if needed
    },
});
