import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React,{useState, useEffect} from 'react';
import Header from '@/app/src/shared/Header';
import apiService from '@/app/src/services/apiService';

const DetailScreen = ({ route }: any) => {
   // huynh them giao dien ngoi sao cho benh vien
    const [evalutions,setEvalutions] = useState<[]>([])
    const { item, type } = route.params; 
    const hospitalId = item?._id
    console.log("id benh vien: ", hospitalId)

    const getEvalutionByHospital = async () => {
       try{
        const response = await apiService.getEvalutionByHospital(hospitalId)
        setEvalutions(response.data)
        console.log("data evalution:", response.data)
       }catch(error){
        console.log("error when call apievalution:", error)
       }
    }
    useEffect(()=>{
        getEvalutionByHospital
    })
    const getInitials = (name: string) => {
        const names = name.split(' ');
        return names.map(n => n.charAt(0).toUpperCase()).join('');
    };

    const renderAvatar = (fullname: string) => (
        <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(fullname)}</Text>
        </View>
    );

    const renderDoctorInfo = () => (
        <>
            <Text style={styles.title}>Bác sĩ: {item.fullname}</Text>
            {item.image ? (
                <Image 
                    source={{ uri: item.image }} 
                    style={styles.image} 
                    onError={() => console.log('Image load failed')} // Handle error if needed
                />
            ) : (
                renderAvatar(item.fullname)
            )}
            <Text style={styles.info}>Mã bác sĩ: {item.id}</Text>
            <Text style={styles.info}>Chuyên khoa: {item.specialty}</Text>
        </>
    );

    const renderHospitalInfo = () => (
        <>
            <Text style={styles.title}>Bệnh viện: {item.name}</Text>
            <Text style={styles.address}>Địa chỉ: {item.location}</Text>
            <Text style={styles.info}>Danh sách bác sĩ:</Text>
            {item.doctors && item.doctors.length > 0 ? (
                item.doctors.map((doctor: any) => (
                    <Text key={doctor._id} style={styles.doctorName}>
                        - {doctor.fullname} ({doctor.specialty})
                    </Text>
                ))
            ) : (
                <Text style={styles.noDoctors}>Không có bác sĩ nào được liệt kê.</Text>
            )}
        </>
    );

    return (
        <View style={styles.container}>
            <Header title={type === 'doctor' ? 'Thông tin bác sĩ' : 'Thông tin bệnh viện'} showBackButton={true} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {type === 'doctor' ? renderDoctorInfo() : type === 'hospital' ? renderHospitalInfo() : null}
            </ScrollView>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollView: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
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
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    info: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        color: '#444',
    },
    doctorName: {
        fontSize: 16,
        color: '#555',
    },
    noDoctors: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    avatar: {
        width: 70, // Same size as the image
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ddd', // Placeholder background color
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'center',
    },
    avatarText: {
        fontSize: 24,
        color: '#fff', // White text color for contrast
        fontWeight: 'bold',
    },
});
