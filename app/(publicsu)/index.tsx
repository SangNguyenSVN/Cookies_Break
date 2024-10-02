import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import SignInWithGoogle from '../src/hooks/SignInWithGoogle';




const index = () => {
  const [data, setData] = useState<any>();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();




  const handleLogin = async () => {
    router.replace("/(doctor)"); // Điều hướng tới doctor bằng đường dẫn tuyệt đối
  };
  



  return (
    <View style={styles.container} >
      <BlurView blurReductionFactor={2} intensity={10} style={styles.form}>
        <View>
          <Text style={styles.txtHeader}>Wellcome, 👋</Text>
          <View style={styles.viewBox}>
            <Text style={styles.viewTxt}>Email or Username</Text>
            <TextInput
              value={identifier}
              onChangeText={setIdentifier}
              numberOfLines={1}
              editable
              style={styles.viewInput} placeholder='' />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewTxt}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              numberOfLines={1}
              editable
              secureTextEntry
              style={styles.viewInput} placeholder='' />
          </View>
        </View>
        <View>
          <View style={styles.viewIcon}>
            <View style={{width: '100%',flexDirection: "row", justifyContent: "space-between"}}>
              <TouchableOpacity>
                <Text>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <Link href={'./register'} >
                <Text>
                  Register
                </Text>
              </Link>
              <SignInWithGoogle/>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.txtLogin}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
    // <View style={styles.container}>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Tên đăng nhập"
    //     value={identifier}
    //     onChangeText={setIdentifier}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Mật khẩu"
    //     secureTextEntry
    //     value={password}
    //     onChangeText={setPassword}
    //   />
    //   <Button title="Đăng nhập" onPress={handleLogin} />
    // </View>
  )
}

export default index

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   padding: 16,
//   // },
//   // input: {
//   //   height: 40,
//   //   borderColor: 'gray',
//   //   borderWidth: 1,
//   //   marginBottom: 12,
//   //   paddingHorizontal: 8,
//   // }
// })
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 15,
  },
  viewBox: {
    margin: 10
  },
  viewTxt: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  viewInput: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  txtHeader: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 50,
    color: 'black',

  },
  viewIcon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  btnLogin: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  txtLogin: {
    color: 'white',
    fontSize: 17,
    padding: 15,
    letterSpacing: 1.4,
  }
})