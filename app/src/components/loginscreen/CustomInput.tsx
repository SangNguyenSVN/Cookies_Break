import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Image, Text } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  secureTextEntry?: boolean; // Optional prop for password input
  errorMessage?: string; // Optional prop for displaying error messages
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, secureTextEntry = false, errorMessage }) => {
  const [value, setValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword} // Toggle visibility
          value={value}
          onChangeText={setValue}
        />
        {secureTextEntry && (
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Image
              source={showPassword 
                ? require('../../assets/icon/google_icon.png') // Replace with your open eye icon
                : require('../../assets/icon/Message_alt_fill.png') // Replace with your closed eye icon
              }
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 50,
    width:380,
    marginBottom: 12,
    alignSelf:"center"
  },
  input: {
    flex: 1,
    height: '100%',
  },
  eyeIcon: {
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomInput;
