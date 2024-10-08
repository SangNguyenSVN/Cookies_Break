import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Sử dụng thư viện icon
import Header from '../../shared/Header';

const AccountScreen = () => {
    return (

        <View style={styles.container}>
            <Header title="Tài khoản" showBackButton={false} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.accountInfo}>
                    <View style={styles.infoLeft}>
                        <TouchableOpacity>
                            <Text style={styles.infoTextBlue}>Sửa thông tin của bạn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.infoTextRed}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoRight}>
                        <View style={styles.avatarPlaceholder} />
                    </View>
                </View>

                <View style={styles.walletPointsContainer}>
                    <View style={styles.walletBox}>
                        <FontAwesome name="dollar" size={24} color="black" />
                        <Text style={styles.walletText}>Số dư trong ví</Text>
                        <Text style={styles.walletBalance}>0đ</Text>
                    </View>
                    <View style={styles.pointsBox}>
                        <MaterialIcons name="star" size={24} color="black" />
                        <Text style={styles.walletText}>Điểm tích lũy</Text>
                        <Text style={styles.walletBalance}>0đ</Text>
                    </View>
                </View>

                {/* Các tùy chọn quản lý */}
                <View style={styles.managementOptions}>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="folder" size={24} color="green" />
                        <Text style={styles.optionText}>Quản lý hồ sơ khám</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="heart" size={24} color="green" />
                        <Text style={styles.optionText}>Quản lý yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="calendar" size={24} color="green" />
                        <Text style={styles.optionText}>Quản lý khám</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="plus-square" size={24} color="green" />
                        <Text style={styles.optionText}>Quản lý gói khám</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="question-circle" size={24} color="green" />
                        <Text style={styles.optionText}>Quản lý câu hỏi</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerOptions}>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="check-circle" size={24} color="green" />
                        <Text style={styles.optionText}>Điều khoản dịch vụ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="phone" size={24} color="green" />
                        <Text style={styles.optionText}>Liên hệ với chúng tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutOption}>
                        <FontAwesome name="sign-out" size={24} color="red" />
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        backgroundColor: '#689F38',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    accountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    infoLeft: {
        flexDirection: 'column',
    },
    infoTextBlue: {
        color: 'blue',
        marginBottom: 10,
    },
    infoTextRed: {
        color: 'red',
    },
    infoRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 25,
    },
    walletPointsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#e0f2f1',
        borderRadius: 10,
        marginHorizontal: 20,
    },
    walletBox: {
        alignItems: 'center',
    },
    pointsBox: {
        alignItems: 'center',
    },
    walletText: {
        marginTop: 10,
        fontSize: 14,
    },
    walletBalance: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
    managementOptions: {
        marginVertical: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
    },
    footerOptions: {
        marginTop: 10,
    },
    logoutOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    logoutText: {
        marginLeft: 15,
        fontSize: 16,
        color: 'red',
    },
});
