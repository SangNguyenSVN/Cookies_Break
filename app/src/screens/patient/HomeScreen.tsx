import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from '../../shared/Header';
import Item_Icon_List_View from '../../components/patient/homescreen/Item_Icon_List_View';
import Search from '../../components/patient/homescreen/Search';
import apiService from '../../services/apiService';
import SubHeading from '../../shared/SubHeading';
import { useFocusEffect } from '@react-navigation/native';
import Slider from '../../components/patient/homescreen/Slider';
import Category from '../../components/patient/homescreen/Category';

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  // Fetch news data
  const getNews = async () => {
    try {
      const response = await apiService.getNews();
      console.log('Data:', response.data);
      setNewsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Lỗi khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNews();
    }, [])
  );



  return (
    <View style={styles.container}>
      <Header title="Cookies Break" showBackButton={false} />

      <View style={styles.searchContainer}>
        <Search />
      </View>

      <View style={styles.iconListContainer}>
        <Item_Icon_List_View />
      </View>

      <View style={styles.viewitem}>
        <Category />

        <Slider data={newsData} />
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#489458',
  },
  iconListContainer: {
    marginTop: -40,
  },
  viewitem:{
    flex:1,
    paddingHorizontal:10
  }
});
