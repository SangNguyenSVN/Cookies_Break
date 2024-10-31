import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { useState } from 'react';
import authService from '../src/services/authService';
import { Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { validateName, validatePassword, validatePhoneNumber } from '../src/services/Validated'; // Import các hàm kiểm tra

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [usernameError, setUsernameError] = useState<any>('');
  const [passwordError, setPasswordError] = useState<any>('');
  const [phoneNumberError, setPhoneNumberError] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    let hasError = false;

    // Validate username
    if (!validateName(username)) {
      setUsernameError('Tên người dùng không hợp lệ'); // Adjust the message based on your validation
      hasError = true;
    } else {
      setUsernameError('');
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Mật khẩu không hợp lệ'); // Adjust the message based on your validation
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Số điện thoại không hợp lệ'); // Adjust the message based on your validation
      hasError = true;
    } else {
      setPhoneNumberError('');
    }

    if (hasError) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin hợp lệ");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.registerPatient(username, password, phoneNumber);
      setLoading(false);
      router.back();
      console.log(response.message);
      Alert.alert("Đăng ký thành công");
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      Alert.alert("Người dùng đã tồn tại");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: 'height' })}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Text style={styles.txtHeader}>Welcome to Cookies Break</Text>
            <Text style={styles.txtTitle}>Simplify your health management with us.</Text>
            <Image style={styles.img} source={require("../src/assets/public/login_img_1.png")} />

            <View style={styles.viewBox}>
              <TextInput
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
                style={[styles.viewInput, usernameError && styles.inputError]}
                placeholder="Tên người dùng"
              />
              {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            </View>

            <View style={styles.viewBox}>
              <TextInput
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.viewInput, passwordError && styles.inputError]}
                placeholder="Mật khẩu"
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <View style={styles.viewBox}>
              <TextInput
                keyboardType="phone-pad"
                placeholderTextColor="gray"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={[styles.viewInput, phoneNumberError && styles.inputError]}
                placeholder="Số điện thoại"
              />
              {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
            </View>

            <View>
              <TouchableOpacity style={styles.btnLogin} onPress={handleRegister} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.txtLogin}>Đăng ký</Text>
                )}
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
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  form: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  viewBox: {
    marginVertical: 10,
  },
  viewInput: {
    padding: 12,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  txtHeader: {
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    color: '#333',
  },
  txtTitle: {
    alignSelf: 'center',
    marginVertical: 10,
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  btnLogin: {
    height: 45,
    backgroundColor: '#489458',
    borderRadius: 25,
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '80%',
    maxWidth: 300,
  },
  txtLogin: {
    color: 'white',
    fontSize: 16,
  },
  img: {
    alignSelf: 'center',
    marginVertical: 15,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default Register;
