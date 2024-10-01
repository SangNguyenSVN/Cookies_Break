import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Hospital_Doctor_Tab from '../../components/explore/Hospital_Doctor_Tab'
import Header from '../../shared/Header'
import { useNavigation } from '@react-navigation/native';
const ExploreScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('');
    const param = useRoute<any>().params
    const [hospitalLst, setHospitalLst] = useState<any[]>();
    const [doctorLst, setDoctorLst] = useState<any[]>();
    const [clinicLst, setClinic] = useState<any[]>();
    const data = () => {
        const hospitalData = [
            {

            },]
    }
    const dataBacsi = [
        {
            id: 1,
            name: "Bác sĩ Nguyễn Văn A",
            image: "https://i.pravatar.cc/150?img=1",
            address: "Số 1, Đường 1, Phường 1, Quận1, TP.HCM",
        }
    ]
    return (
        <View style={styles.container}>
            <Header title={'sang xau qua'} />
            <Hospital_Doctor_Tab activeTab={(value: any) => setActiveTab(value)} />
            {
                // dieu kien neu tab la bac si
                activeTab === 'doctor' ? (
                    // dieu kien neu co data bac si
                    !dataBacsi?.length
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        : <TouchableOpacity onPress={() => {
                            navigation.navigate('Details', { item: dataBacsi })
                        }}>
                            <View>
                                <Text>Doctor List</Text>
                            </View>
                        </TouchableOpacity>
                ) : activeTab === 'hospital' ? (
                    !hospitalLst?.length
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        : <View>
                            <Text>Hospital List</Text>
                        </View>
                ) : activeTab === 'clinic' ? ( // Thêm điều kiện cho clinic
                    !clinicLst?.length
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        : <View>
                            <Text>Clinic List</Text>
                        </View>
                ) : null // Xử lý khi không có tab nào được chọn
            }
        </View>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
    },
    txtLoading: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        paddingTop: 40,
        color: 'gray'
    },
    contentContainer: {}
})