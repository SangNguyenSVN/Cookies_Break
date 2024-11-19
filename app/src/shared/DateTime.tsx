import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { getTimes, getDays } from '../services/dayTime'; // Đảm bảo đường dẫn import đúng
import SubHeading from './SubHeading';
import moment from 'moment'; // Đảm bảo đã cài đặt moment

const DateTimeForm = ({ onDaySelected, onHourSelected, data }: any) => {
    const [nextSevenDays, setNextSevenDays] = useState([]);
    const [hourOfDay, setHourOfDay] = useState([]);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    useEffect(() => {
        const days: any = getDays(); // Lấy dữ liệu ngày
        const times: any = getTimes(); // Lấy dữ liệu giờ
        setNextSevenDays(days);
        setHourOfDay(times);
    }, []);

    const isTimeBooked = (date: string | null, time: string | null): boolean => {
        if (!date || !time) return false;
        return data.some(
            (entry: any) => 
                moment(entry.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') && 
                entry.time === time
        );
    };

    const toggleDaySelection = (item: any) => {
        if (selectedDay === item.date) {
            setSelectedDay(null);
            onDaySelected(null);
            return;
        }
        
        if (isTimeBooked(item.date, selectedHour)) {
            Alert.alert('Thông báo', 'Giờ này đã được chọn. Vui lòng chọn ngày hoặc giờ khác.');
            return;
        }

        setSelectedDay(item.date);
        onDaySelected(item.date);
    };

    const toggleHourSelection = (item: any) => {
        if (!selectedDay) {
            Alert.alert('Thông báo', 'Vui lòng chọn ngày trước khi chọn giờ.');
            return setSelectedHour(null);
        }

        if (isTimeBooked(selectedDay, item.time)) {
            Alert.alert('Thông báo', 'Giờ này đã được chọn. Vui lòng chọn giờ khác.');
            return ;
        }

        setSelectedHour(item.time === selectedHour ? null : item.time);
        onHourSelected(item.time === selectedHour ? null : item.time);
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

    const renderItemTime = ({ item }: any) => {
        const isBooked = isTimeBooked(selectedDay, item.time);

        return (
            <View style={styles.itemListView}>
                <TouchableOpacity
                    style={[isBooked ? styles.btnItem_Booked : (selectedHour === item.time ? styles.btnItem_Selected : styles.btnItem)]}
                    onPress={() => isBooked ? null : toggleHourSelection(item)} 
                >
                    <Text style={styles.times}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <View style={styles.viewItem_Form}>
                <SubHeading title={"Ngày: "} />
                <FlatList
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    data={nextSevenDays}
                    renderItem={renderItemDay}
                    keyExtractor={(item: any) => item.date}
                />
            </View>
            <View style={styles.viewItem_Form}>
                <SubHeading title={"Giờ: "} />
                <FlatList
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    data={hourOfDay}
                    renderItem={renderItemTime}
                    keyExtractor={(item : any) => item.time}
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
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
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
        backgroundColor: '#489458',
    },
    btnItem_Booked: {
        height: 50,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
        backgroundColor: 'lightgray', // Gray background for booked times
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
        // Thêm style nếu cần
    },
});
