import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Hospital_Doctor_Tab from '../../components/explore/Hospital_Doctor_Tab'
import Header from '../../shared/Header'
const ExploreScreen = () => {
    const [activeTab, setActiveTab] = useState('');
    const param = useRoute<any>().params
    const [hospitalLst, setHospitalLst] = useState<any[]>();
    const [doctorLst, setDoctorLst] = useState<any[]>();
    const [clinicLst, setClinic] = useState<any[]>();
    const data =()=>{
      const hospitalData = [
        {

        },]
    }
    return (
        <View style={styles.container}>
          <Header title={'sang xau qua'}/>
            <Hospital_Doctor_Tab activeTab={(value: String) => setActiveTab(value)} />
            {
                activeTab === 'doctor' ? (
                    !doctorLst?.length
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        : <View>
                            <Text>Doctor List</Text>
                        </View>
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