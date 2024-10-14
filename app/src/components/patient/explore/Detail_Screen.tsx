// DetailScreen.tsx
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Header from '@/app/src/shared/Header';

const DetailScreen = ({ route }: any) => {
    const { item, type } = route.params; // Nhận thông tin và loại (type) từ params

    return (
        <View style={styles.container}>
            {/* Hiển thị thông tin theo type */}
            {type === 'doctor' ? (
                <>
                    <Header title='Thông tin bác sĩ' showBackButton={false} />
                    <Text style={styles.title}>Bác sĩ: {item.name}</Text>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    {/* Thêm thông tin khác về bác sĩ nếu cần */}
                    <Text style={styles.info}>Mã bác sĩ: {item.id}</Text>
                </>
            ) : type === 'hospital' ? (
                <>
                    <Header title='Thông tin bệnh việnviện' showBackButton={false} />
                    <Text style={styles.title}>Bệnh viện: {item.name}</Text>
                    <Text style={styles.address}>Địa chỉ: {item.address}</Text>
                    {/* Hiển thị danh sách bác sĩ liên quan */}
                    <Text style={styles.info}>Danh sách bác sĩ:</Text>
                    {item.doctors && item.doctors.map((doctor: any) => (
                        <Text key={doctor.id} style={styles.doctorName}>
                            - {doctor.name}
                        </Text>
                    ))}
                </>
            ) : null}
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    address: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    doctorName: {
        fontSize: 16,
        color: 'gray',
    },
});
