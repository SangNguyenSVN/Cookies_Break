import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useState } from 'react';
import authService from '../src/services/authService';
import { Keyboard } from 'react-native';
import { useRouter } from 'expo-router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const router = useRouter();

  // Create the user and send the verification email
  const handleRegister = async () => {
    let hasError = false;

    // Kiểm tra từng trường xem có để trống không
    if (!username) {
      setUsernameError(true);
      hasError = true;
    } else {
      setUsernameError(false);
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!phoneNumber) {
      setPhoneNumberError(true);
      hasError = true;
    } else {
      setPhoneNumberError(false);
    }

    if (hasError) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const response = await authService.registerPatient(username, password, phoneNumber, '6705462a5a05cf049a981782');
      router.back();
      console.log(response.message);
      Alert.alert("Đăng ký thành côngcông");
      // Thực hiện các hành động khác sau khi đăng ký thành công
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Đăng ký thất bại");
    }
  };

  // Giao diện đăng ký
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <Text style={styles.txtHeader}>Welcome to Cookies Break</Text>
            <Text style={styles.txtTitle}>Simplify your health management with us.</Text>
            <Image style={styles.img} source={require("../src/assets/public/login_img_1.png")} />

            <View style={styles.viewBox}>
              <TextInput
                placeholderTextColor={"gray"}
                value={username}
                onChangeText={setUsername}
                style={[styles.viewInput, usernameError && styles.inputError]} // Áp dụng viền đỏ nếu có lỗi
                placeholder='Tên người dùng'
              />
            </View>

            <View style={styles.viewBox}>
              <TextInput
                placeholderTextColor={"gray"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.viewInput, passwordError && styles.inputError]} // Áp dụng viền đỏ nếu có lỗi
                placeholder='Mật khẩu'
              />
            </View>
            <View style={styles.viewBox}>
              <TextInput
                keyboardType='phone-pad'
                placeholderTextColor={"gray"}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={[styles.viewInput, phoneNumberError && styles.inputError]} // Áp dụng viền đỏ nếu có lỗi
                placeholder='Số điện thoại'
              />
            </View>

            <View>
              <TouchableOpacity style={styles.btnLogin} onPress={handleRegister}>
                <Text style={styles.txtLogin}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Cho phép ScrollView có thể kéo dài
    justifyContent: 'center', // Căn giữa nội dung
    alignItems: 'center', // Căn giữa nội dung
  },
  form: {
    marginVertical: 20,
  },
  viewBox: {
    margin: 10,
  },
  viewInput: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    width: '100%', // Đặt chiều rộng 100% cho các trường nhập liệu
  },
  inputError: {
    borderColor: 'red', // Màu viền đỏ khi có lỗi
  },
  txtHeader: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 10,
    color: 'black',
  },
  txtTitle: {
    alignSelf: 'center',
  },
  btnLogin: {
    height: 40,
    width: 250,
    backgroundColor: '#489458',
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  txtLogin: {
    color: 'white',
  },
  img: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default Register;
