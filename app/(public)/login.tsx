import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, Image, TouchableOpacity, Alert, ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import SignInWithGoogle from '../src/hooks/SignInWithGoogle';
import authService from '../src/services/authService';
import { validateName, validatePassword } from '../src/services/Validated'; // Import validation functions

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userType }: any = useLocalSearchParams(); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });
  const router = useRouter();

  useEffect(() => {
    if (!userType) {
      router.back(); // Go back if no userType
    }
  }, [userType]);

  const handleLogin = async () => {
    // Reset errors
    setErrors({ username: false, password: false });

    // Trimmed inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validation
    let hasError = false;
    
    // Using validation functions
    if (!validateName(trimmedUsername)) {
      setErrors(prev => ({ ...prev, username: true }));
      hasError = true;
    }

    if (!validatePassword(trimmedPassword)) {
      setErrors(prev => ({ ...prev, password: true }));
      hasError = true;
    }

    if (hasError) {
      Alert.alert("Lỗi", "Vui lòng nhập tên người dùng và mật khẩu hợp lệ.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await authService.login(trimmedUsername, trimmedPassword, userType);
      if (response) {
        router.replace(userType === 'doctor' ? '/(doctor)' : '/(user)');
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập.");
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success or failure
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 50 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <View>
              <Text style={styles.txtHeader}>Xin Chào {userType === 'doctor' ? 'Bác sĩ' : 'Bệnh nhân'}</Text>
              <Text style={styles.txtTitle}>Chào mừng bạn đến với dịch vụ lịch khám Cookies Break.</Text>
              <Text style={styles.txtTitle}></Text>
              <Image style={styles.img} source={require("../src/assets/public/login_img_1.png")} />

              <View style={styles.viewBox}>
                <TextInput
                  placeholderTextColor="gray"
                  value={username}
                  onChangeText={setUsername}
                  numberOfLines={1}
                  style={[styles.viewInput, errors.username && styles.inputError]}
                  placeholder="Tên người dùng"
                  editable={!loading} // Disable input when loading
                  accessibilityLabel="Tên người dùng"
                />
                {errors.username && <Text style={styles.errorText}>Tên người dùng không hợp lệ.</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.viewBox}>
                <TextInput
                  placeholderTextColor="gray"
                  value={password}
                  onChangeText={setPassword}
                  numberOfLines={1}
                  secureTextEntry
                  style={[styles.viewInput, errors.password && styles.inputError]}
                  placeholder="Mật khẩu"
                  editable={!loading} // Disable input when loading
                  accessibilityLabel="Mật khẩu"
                />
                {errors.password && <Text style={styles.errorText}>Mật khẩu không hợp lệ.</Text>}
              </View>
            </View>

            <View>
              {/* <View style={styles.viewIcon}>
                <View>
                  <Link href="/(public)/forgot">Quên mật khẩu</Link>
                </View>
              </View> */}
              <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtLogin}>Đăng nhập</Text>}
              </TouchableOpacity>
            </View>
          </View>

          {userType === 'patient' && (
            <View style={styles.viewbot}>
              <SignInWithGoogle />
              <View style={styles.viewRegister}>
                <Text>Bạn chưa có tài khoản? </Text>
                <Link style={{ color: 'green' }} href="/(public)/register">Đăng ký</Link>
              </View>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    marginVertical: 10,
    width: '90%', // Keep form centered
    alignSelf: 'center',
  },
  viewInput: {
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
  },
  inputError: {
    borderColor: 'red', // Red border for error state
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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
    textAlign: 'center', // Center text
  },
  viewIcon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLogin: {
    height: 40,
    width: Platform.OS === 'ios' ? 250 : 260,
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
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  viewRegister: {
    margin: 10,
    flexDirection: 'row',
  },
  viewbot: {
    alignItems: 'center',
    position: 'relative',
  },
});
