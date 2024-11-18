import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showBackButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Không thể quay lại");
    }
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <View style={styles.iconContainer}>
            <AntDesign name="leftcircleo" size={40} color="white" />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#489458',
    padding: 18,
    paddingTop: 44,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    bottom: 0,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
