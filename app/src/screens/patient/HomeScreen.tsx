import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../shared/Header';
import Item_Icon_List_View from '../../components/patient/homescreen/Item_Icon_List_View';
import Search from '../../components/patient/homescreen/Search';
import Item_Specialties_List_View from '../../components/patient/homescreen/Item_Specialties_List_View';
import Item_Card_New_View from '../../components/patient/homescreen/Item_Card_New_View';
import axios from 'axios';

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  // Fetch news data
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/apis/news/get3');
      console.log('Data:', response.data);
      setNewsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Lỗi khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: any }) => {
    // Assuming `item` has a 'title' and 'image' properties directly
    const imageUrl = item.sections.find((section: any) => section.type === 'image')?.url || 'https://via.placeholder.com/150';

    return (
      <View style={{ padding: 10 }}>
        <Item_Card_New_View title={item.title} imageUrl={imageUrl} />
      </View>
    );
  };

  return (
    <View style={{ position: 'relative' }}>
      <Header title={'Cookies Break'} showBackButton={false} />

      <View style={{ width: '100%', height: 140, backgroundColor: '#489458' }}>
        <Search />
      </View>

      <View style={{ position: 'absolute', alignItems: 'center', marginTop: 165, width: '100%' }}>
        <Item_Icon_List_View />
      </View>

     

      <Text style={[styles.TextStyle, { paddingTop: 80 }]}>Chuyên khoa</Text>
      <View style={{ height: 22 }}></View>
      <Item_Specialties_List_View />

      <View style={[styles.smallContainer, { paddingTop: 71, paddingBottom: 16 }]}>
        <Text style={[styles.TextStyle, { fontSize: 12 }]}>Các bài báo nổi bật</Text>
        <Pressable>
          <Text style={[styles.TextStyle, { color: '#589FFC', fontSize: 12 }]}>Xem thêm</Text>
        </Pressable>
      </View>

      {/* FlatList to display news items in a horizontal scroll */}
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải...</Text>
      ) : error ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          snapToInterval={300} 
          decelerationRate="fast"
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 13,
    fontWeight: '400',
    paddingLeft: 20,
  },
  smallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  flatListContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
