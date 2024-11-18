import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import InformationForm from '../InformationForm';
import DateTimeForm from '../DateTime';
import SubHeading from '../SubHeading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import apiService from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';

const BookingScreen = ({ route }: { route: any }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { doctor, hospital, selectedPackage } = route.params;
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [onsubmitForm, setOnsubmitForm] = useState(false);

  const [appointment, setAppointment] = useState<[]>()

  const idPatient = user?.user?.id;
  const idDoctor = doctor._id;
  const idHospital = hospital._id;
  const idPackage = selectedPackage._id;

  const getAppointment = async () => {
    try {
      const data = await apiService.getDateAppointmentByDoctor(idDoctor);
      console.log("thoi gian lich kham", data.data)
      setAppointment(data.data)
    } catch (error) {
      // console.error("Error get date time appointment:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAppointment()
  }, [])





  const handleDaySelected = (day: string) => {
    setSelectedDay(day);
  };

  const handleHourSelected = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleFullnameChanged = (name: string) => {
    setFullname(name);
  };

  const handleEmailChanged = (email: string) => {
    setEmail(email);
  };

  const handlePhoneNumberChanged = (number: string) => {
    setPhoneNumber(number);
  };

  const handleNoteChanged = (note: string) => {
    setNote(note); // Cập nhật ghi chú
  };

  const handleBooking = async () => {
    setOnsubmitForm(true)


    if (!fullname || !email || !phoneNumber || !selectedDay || !selectedHour) {
      Alert.alert("Thông tin không đầy đủ", "Vui lòng điền đầy đủ thông tin hợp lệ.");
      return;
    }

    console.log("benh vien: ", idHospital);
    console.log("goi kham: ", idPackage);
    console.log("bac si: ", idDoctor);
    console.log("ten : ", fullname);
    console.log("email : ", email);
    console.log("SDT: ", phoneNumber);
    console.log("ngay: ", selectedDay);
    console.log("gio: ", selectedHour);
    console.log("ghi chu: ", note);

    setLoading(true); // Bắt đầu loading

    try {
      // Chuyển đổi selectedDay thành Date trước khi gọi API

      // Gọi API để tạo lịch hẹn
      const response = await apiService.postAppointment({
        patient: idPatient || "",
        doctor: idDoctor,
        package: idPackage,
        time: selectedHour,
        date: selectedDay, // Chuyển đổi sang định dạng ISO nếu cần
        notes: note,
        fullname,
        email,
        phoneNumber,
      });

      // Nếu đặt lịch thành công, bạn có thể điều hướng hoặc hiển thị thông báo
      Alert.alert("Đặt lịch thành công", "Bạn đã đặt lịch thành công!");
      return response;
    } catch (error) {
      console.error("Error booking appointment:", error);
      Alert.alert("Có lỗi xảy ra", "Không thể đặt lịch hẹn, vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };



  return (
    <View style={styles.container}>
      <Header title='Đặt Lịch' showBackButton={true} />
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <ImageBackground
              source={{ uri: hospital.image }}
              style={styles.hospitalImage}
              resizeMode="cover"
            >
              <View style={styles.infoContainer}>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
                <Text style={styles.doctorName}>Bác sĩ: {doctor.name}</Text>
              </View>
            </ImageBackground>

            <View style={styles.form_container}>
              <InformationForm
                onFullnameChanged={handleFullnameChanged}
                onEmailChanged={handleEmailChanged}
                onChangePhoneNumber={handlePhoneNumberChanged}
                onsubmitForm={onsubmitForm}
              />
              <DateTimeForm onDaySelected={handleDaySelected} onHourSelected={handleHourSelected} data={appointment} />
              <SubHeading title={"Ghi chú"} />
              <TextInput
                style={styles.textInput}
                placeholder="Nhập ghi chú ở đây..."
                multiline={true}
                numberOfLines={4}
                onChangeText={handleNoteChanged} // Cập nhật ghi chú
              />

              <TouchableOpacity
                style={[
                  styles.bookButton,
                  loading ? styles.loadingButton : styles.normalButton // Thay đổi style tùy thuộc vào loading
                ]}
                onPress={handleBooking}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.bookButtonText}>Đặt Lịch</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form_container: {
    padding: 10,
    flexGrow: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    height: 80
  },
  textInputError: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  hospitalImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorName: {
    fontSize: 18,
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#489458',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  loadingButton: {
    marginVertical: 10, // Đặt margin cho button khi loading
  },
  normalButton: {
    marginVertical: 20, // Đặt margin cho button khi không loading
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});
