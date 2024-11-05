import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { getTimes, getDays } from '../services/dayTime'; // Đảm bảo đường dẫn import đúng
import SubHeading from './SubHeading';
import moment from 'moment'; // Đảm bảo đã cài đặt moment

const DateTimeForm = ({ onDaySelected, onHourSelected, data }: any) => {
    const [nextSevenDays, setNextSevenDays] = useState([]);
    const [hourOfDay, setHourOfDay] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

    useEffect(() => {
        const days: any = getDays(); // Lấy dữ liệu ngày
        const times: any = getTimes(); // Lấy dữ liệu giờ
        setNextSevenDays(days);
        setHourOfDay(times);
    }, []);

    const toggleDaySelection = (item: any) => {
        const formattedSelectedDate = moment(item.date).format('YYYY-MM-DD');

        // Kiểm tra xem ngày đã tồn tại trong data chưa
        const existingDate = data.find((entry: any) => moment(entry.date).format('YYYY-MM-DD') === formattedSelectedDate);

        if (existingDate) {
            // Nếu ngày đã tồn tại, kiểm tra giờ
            if (selectedHour && existingDate.time === selectedHour) {
                Alert.alert('Thông báo', 'Giờ này đã được chọn cho ngày này. Vui lòng chọn giờ khác.'); // Thay alert bằng Alert.alert
                return; // Ngăn không cho chọn
            }
        }

        // Cập nhật ngày đã chọn
        if (selectedDay === item.date) {
            setSelectedDay(null);
            onDaySelected(null);
        } else {
            setSelectedDay(item.date);
            onDaySelected(item.date);
        }
    };

    const toggleHourSelection = (item: any) => {
        const formattedSelectedDate = moment(selectedDay).format('YYYY-MM-DD');

        // Kiểm tra nếu ngày đã được chọn
        if (selectedDay) {
            const existingDate = data.find((entry: any) => moment(entry.date).format('YYYY-MM-DD') === formattedSelectedDate);

            if (existingDate && existingDate.time === item.time) {
                Alert.alert('Thông báo', 'Giờ này đã được chọn cho ngày này. Vui lòng chọn giờ khác.');
                return; // Ngăn không cho chọn
            }
        }

        // Cập nhật giờ đã chọn
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

    const renderItemTime = ({ item }: any) => {
        const isBooked = selectedDay ? data.some((entry: any) => moment(entry.date).format('YYYY-MM-DD') === moment(selectedDay).format('YYYY-MM-DD') && entry.time === item.time) : false;

        return (
            <View style={styles.itemListView}>
                <TouchableOpacity
                    style={[isBooked ? styles.btnItem_Booked : (selectedHour === item.time ? styles.btnItem_Selected : styles.btnItem)]}
                    onPress={() => isBooked ? null : toggleHourSelection(item)} // Prevent selection if booked
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
