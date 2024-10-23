import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SubHeading from './SubHeading';
import { TextInput } from 'react-native-gesture-handler';

const InformationForm = ({ onFullnameChanged, onEmailChanged, onChangePhoneNumber }: any) => {
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhonenumber] = useState<string>('');

    useEffect(() => {
        // Any side effects can be handled here
    }, []);

    const handleFullnameChange = (fullnameChange: string) => {
        setFullname(fullnameChange);
        onFullnameChanged(fullnameChange);
    };

    const handlePhonenumberChange = (phonenumberChange: string) => {
        setPhonenumber(phonenumberChange);
        onChangePhoneNumber(phonenumberChange);
    };

    const handleEmailChange = (emailChange: string) => {
        setEmail(emailChange);
        onEmailChanged(emailChange); // Call the passed down function
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewItem_Input}>
                <SubHeading title={'Tên đầy đủ:'} />
                <TextInput
                    style={styles.item_Input}
                    value={fullname}
                    onChangeText={handleFullnameChange}
                    placeholder="Nhập tên đầy đủ"
                />
            </View>
            <View style={styles.viewItem_Input}>
                <SubHeading title={'Số điện thoại:'} />
                <TextInput
                    style={styles.item_Input}
                    value={phoneNumber}
                    onChangeText={handlePhonenumberChange}
                    placeholder="Nhập số điện thoại"
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.viewItem_Input}>
                <SubHeading title={'Email:'} />
                <TextInput
                    style={styles.item_Input}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="Nhập địa chỉ email"
                    keyboardType="email-address"
                />
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
});
