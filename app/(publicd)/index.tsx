import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import { CheckBox } from 'react-native-elements';




const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();




  const handleLogin = async () => {
    router.replace("/(doctor)");
  };




  return (
    <View style={styles.container} >
      <View style={styles.form}>
        <View>
          <Text style={styles.txtHeader}>Wellcome Back Doctor</Text>
          <Text style={styles.txtTitle}>Simplity your workflow and boost your productivity with </Text>
          <Text style={styles.txtTitle}>Cookies Break App. Get started for  free.</Text>
          <Image style={styles.img} source={require("../src/assets/public/login_img_1.png")} />
          <View style={styles.viewBox}>
            <TextInput
              placeholderTextColor={"gray"}
              value={username}
              onChangeText={setUsername}
              numberOfLines={1}
              editable
              style={styles.viewInput} placeholder='Tên người dùng' />
          </View>
          <View style={styles.viewBox}>
            <TextInput
              placeholderTextColor={"gray"}
              value={password}
              onChangeText={setPassword}
              numberOfLines={1}
              editable
              secureTextEntry
              style={styles.viewInput} placeholder='Mật khẩukhẩu' />
          </View>
        </View>
        <View>
          <View style={styles.viewIcon}>
            <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
              <View >
                <CheckBox
                  title="Nhớ đăng nhập"
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  containerStyle={styles.checkbox}
                />
              </View>
              <TouchableOpacity>
                <Text>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.txtLogin}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    
  },
  viewBox: {
    margin: 10
  },
  viewInput: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  checkbox: {
    backgroundColor: 'transparent', // No background for checkbox
    borderWidth: 0, // No border
   
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
    justifyContent:'center',
    alignSelf:'center'
  },
  txtLogin: {
    color: 'white',
    
  },
  img: {
    alignSelf: 'center',
    margin: 10,
  }

})