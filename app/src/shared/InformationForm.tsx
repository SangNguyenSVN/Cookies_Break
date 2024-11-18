import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SubHeading from './SubHeading';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
} from '../../src/services/Validated';

const InformationForm = ({ 
  onFullnameChanged, 
  onEmailChanged, 
  onChangePhoneNumber, 
  onsubmitForm 
}: any) => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhonenumber] = useState<string>('');
  
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
  });

  const validateForm = () => {
    const fullnameError = !validateName(fullname) ? 'Tên không hợp lệ hoặc để trống!' : '';
    const phoneError = !validatePhoneNumber(phoneNumber) ? 'Số điện thoại không hợp lệ!' : '';
    const emailError = !validateEmail(email) ? 'Email không hợp lệ!' : '';

    setErrors({
      fullname: fullnameError,
      phoneNumber: phoneError,
      email: emailError,
    });

    // Trả về kết quả kiểm tra (true nếu không có lỗi)
    return !(fullnameError || phoneError || emailError);
  };

  useEffect(() => {
    if (onsubmitForm) {
      const isValid = validateForm();
      console.log(`Form is valid: ${isValid}`);
    }
  }, [onsubmitForm]);

  const handleFullnameChange = (fullnameChange: string) => {
    setFullname(fullnameChange);
    onFullnameChanged(fullnameChange);
    if (errors.fullname) setErrors((prev) => ({ ...prev, fullname: '' }));
  };

  const handlePhonenumberChange = (phonenumberChange: string) => {
    setPhonenumber(phonenumberChange);
    onChangePhoneNumber(phonenumberChange);
    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
  };

  const handleEmailChange = (emailChange: string) => {
    setEmail(emailChange);
    onEmailChanged(emailChange);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewItem_Input}>
        <SubHeading title="Tên đầy đủ:" />
        <TextInput
          style={[styles.item_Input, errors.fullname ? styles.errorInput : null]}
          value={fullname}
          onChangeText={handleFullnameChange}
          placeholder="Nhập tên đầy đủ"
        />
        {errors.fullname ? <Text style={styles.errorText}>{errors.fullname}</Text> : null}
      </View>

      <View style={styles.viewItem_Input}>
        <SubHeading title="Số điện thoại:" />
        <TextInput
          style={[styles.item_Input, errors.phoneNumber ? styles.errorInput : null]}
          value={phoneNumber}
          onChangeText={handlePhonenumberChange}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
        />
        {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
      </View>

      <View style={styles.viewItem_Input}>
        <SubHeading title="Email:" />
        <TextInput
          style={[styles.item_Input, errors.email ? styles.errorInput : null]}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Nhập địa chỉ email"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>
    </View>
  );
};

export default InformationForm;

const styles = StyleSheet.create({
  container: {
  },
  viewItem_Input: {
    marginBottom: 15,
  },
  item_Input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontSize: 18,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
