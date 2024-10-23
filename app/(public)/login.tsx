import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, Image, TouchableOpacity, Alert, ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import SignInWithGoogle from '../src/hooks/SignInWithGoogle';
import authService from '../src/services/authService';

const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userType }: any = useLocalSearchParams(); // Lấy userType từ tham số đường dẫn
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!userType) {
      // Nếu không có userType, quay lại trang trước đó
      router.back();
    }
  }, [userType]);

  const handleLogin = async () => {
   
    try {
      const roleId = userType === 'doctor' ? 'doctor' : 'patient'; 
      console.log("rolee: "+roleId)
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
<<<<<<< HEAD
      console.log(userType)
=======
      console.log("rolee: "+trimmedUsername)
>>>>>>> f031cfe18ce236131c7db6e19772888c54d204ac
      if (!trimmedUsername || !trimmedPassword) {
        Alert.alert("Lỗi", "Vui lòng nhập tên người dùng và mật khẩu.");
        return;
      }

      // Bắt đầu loading
      setLoading(true);
<<<<<<< HEAD
      const response = await authService.login(trimmedUsername, trimmedPassword, userType);
=======
      const response = await authService.login(trimmedUsername,trimmedPassword,roleId);
      console.log('Result from login:', response)
>>>>>>> f031cfe18ce236131c7db6e19772888c54d204ac

      // Kết thúc loading
      setLoading(false);
      console.log(response);
      if (response) {
        // Kiểm tra vai trò người dùng từ phản hồi
        const userRole = userType;
        if (userRole === 'doctor') {
          router.replace('/(doctor)'); // Chuyển đến trang của bác sĩ
        } else if (userRole === 'patient') {
          router.replace('/(user)'); // Chuyển đến trang của bệnh nhân
        } else {
          Alert.alert("Lỗi", "Vai trò người dùng không hợp lệ.");
        }
      }
    } catch (error: any) {
      setLoading(false); // Kết thúc loading nếu có lỗi xảy ra
      Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập."); // Hiển thị thông báo lỗi
      console.error("Login error:", error); // In lỗi ra console để debug
    }
  };

  const changeScreen =()=>{
    router.replace('/(user)'); // Chuyển đến trang của bệnh nhân
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Đảm bảo cấu hình cho cả iOS và Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Thay đổi giá trị này nếu cần
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <View>
              <Text style={styles.txtHeader}>Welcome {userType === 'doctor' ? 'Doctor' : 'Patient'}</Text>
              <Text style={styles.txtTitle}>Simplify your workflow and boost your productivity with </Text>
              <Text style={styles.txtTitle}>Cookies Break App. Get started for free.</Text>
              <Image style={styles.img} source={require("../src/assets/public/login_img_1.png")} />
              <View style={styles.viewBox}>
                <TextInput
                  placeholderTextColor={"gray"}
                  value={username}
                  onChangeText={setUsername}
                  numberOfLines={1}
                  style={styles.viewInput}
                  placeholder='Tên người dùng'
                />
              </View>
              <View style={styles.viewBox}>
                <TextInput
                  placeholderTextColor={"gray"}
                  value={password}
                  onChangeText={setPassword}
                  numberOfLines={1}
                  secureTextEntry
                  style={styles.viewInput}
                  placeholder='Mật khẩu'
                />
              </View>
            </View>
            <View>
              <View style={styles.viewIcon}>
                <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                  <View>
                    {/* Checkbox for Remember me can be added here */}
                  </View>
                  <Link href={"/(public)/forgot"}>Quên mật khẩu</Link>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} disabled={loading}>
                  {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtLogin}>Đăng nhập</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {userType === 'patient' &&
            <View style={styles.viewbot}>
              <SignInWithGoogle />
              <View style={styles.viewRegister}>
                <Text>Bạn chưa có tài khoản? </Text>
                <Link style={{ color: 'green' }} href={"/(public)/register"}>Đăng ký</Link>
              </View>
            </View>
          }
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginVertical: 20,
  },
  viewBox: {
    marginVertical: 20,
    margin: 20,
  },
  viewInput: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    width: '100%', // Đảm bảo chiều rộng đầy đủ
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
  viewIcon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  viewRegister: {
    margin: 10,
    flexDirection: 'row',
  },
  viewbot: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
});
