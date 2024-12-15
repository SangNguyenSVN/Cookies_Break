import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import apiService from '@/app/src/services/apiService';

interface Specialty {
  _id: string;
  name: string;
  image: string;
}

const Item_Specialties_List_View = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const navigation = useNavigation<any>();

  const navigateToHospitalScreen = (specialty: string) => {
    navigation.navigate('user_hospital_screen', { specialty });
  };

  const getSpecialist = async () => {
    try {
      const response = await apiService.getDepartments();
      setSpecialties(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    getSpecialist();
  }, []);

  const renderItem = ({ item }: { item: Specialty }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => navigateToHospitalScreen(item.name)}
    >
      <Image
        style={styles.image}
        source={{ uri: item.image }}
      />
      <Text style={styles.textStyle}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={specialties}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có dữ liệu</Text>}
      />
    </View>
  );
};

export default Item_Specialties_List_View;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textStyle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
