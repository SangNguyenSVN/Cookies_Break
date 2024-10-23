import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Header from '../Header';
import InformationForm from '../InformationForm';
import DateTimeForm from '../DateTime'; // Sửa lại đường dẫn nếu cần
import SubHeading from '../SubHeading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native'; // Thêm import này

const BookingScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation(); // Sử dụng useNavigation hook
  const { doctor, hospital, selectedPackage} = route.params; // Lấy thông tin bác sĩ và bệnh viện từ navigation parameters
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleDaySelected = (day: string | null) => {
    setSelectedDay(day);
  };

  const handleHourSelected = (hour: string | null) => {
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

  const handleBooking = () => {
    // Kiểm tra xem các thông tin đã đầy đủ chưa
    if (!fullname || !email || !phoneNumber || !selectedDay || !selectedHour) {
      Alert.alert("Thông tin không đầy đủ", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    
  };

  return (
    <View style={styles.container}>
      <Header title='Đặt Lịch' showBackButton={true} />
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20} // Thêm không gian cuộn khi bàn phím mở
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
              />
              <DateTimeForm onDaySelected={handleDaySelected} onHourSelected={handleHourSelected} />
              <SubHeading title={"Ghi chú"} />
              <TextInput
                style={styles.textInput}
                placeholder="Nhập ghi chú ở đây..."
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
                <Text style={styles.bookButtonText}>Đặt Lịch</Text>
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
  },
  hospitalImage: {
    width: '100%', // Chiếm toàn bộ chiều rộng
    height: 200, // Chiều cao cố định, có thể điều chỉnh
    justifyContent: 'flex-end', // Đặt các thành phần trong View xuống dưới
  },
  infoContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền trong suốt để dễ đọc
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ trắng
  },
  doctorName: {
    fontSize: 18,
    color: '#fff', // Màu chữ trắng
  },
  bookButton: {
    backgroundColor: '#00B2BF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
