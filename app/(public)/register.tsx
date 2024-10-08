import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert  } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Other'); // Giá trị mặc định
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Create the user and send the verification email
  const handleRegister = async () => {
    
  };

  // Giao diện đăng ký
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.txtHeader}>Welcome to Cookies Break</Text>
          <Text style={styles.txtTitle}>Simplify your health management with us.</Text>
          <Image style={styles.img} source={require("../src/assets/public/login_img_1.png")} />
          
          <View style={styles.viewBox}>
            <TextInput
              placeholderTextColor={"gray"}
              value={username}
              onChangeText={setUsername}
              style={styles.viewInput} 
              placeholder='Tên người dùng' 
            />
          </View>
          
          <View style={styles.viewBox}>
            <TextInput
              placeholderTextColor={"gray"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.viewInput} 
              placeholder='Mật khẩu' 
            />
          </View>
          <View style={styles.viewBox}>
            <TextInput
              placeholderTextColor={"gray"}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.viewInput} 
              placeholder='Số điện thoại' 
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.btnLogin} onPress={handleRegister}>
            <Text style={styles.txtLogin}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%', // Tăng độ rộng cho form
  },
  viewBox: {
    margin: 10,
  },
  viewInput: {
    height:50,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
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
  }
});

export default Register;
