import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Item_Hospital_Card_View from './Item_Card_View';
import Header from '@/app/src/shared/Header';
import InputSearch from '../../../shared/InputSearch';
import apiService from '@/app/src/services/apiService';

const HospitalScreen = ({ route }: any) => {
  const { specialty } = route.params;
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<any[]>([]); // New state for filtered hospitals
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const getHospitals = async () => {
    setLoading(true);
    try {
      const response = await apiService.getHospitalsDepartment(specialty);
      setHospitals(response.data);
      setFilteredHospitals(response.data); 
      console.log("DỮ liệu", response);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      Alert.alert('Error fetching hospitals');
    } finally {
      setLoading(false);
    }
  };

  const filterHospitals = (query: string) => {
    if (!query) {
      setFilteredHospitals(hospitals);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filteredData = hospitals.filter((hospital: any) =>
        hospital.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredHospitals(filteredData);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    filterHospitals(query);
  };

  // Refresh hospitals
  const onRefresh = () => {
    setRefreshing(true);
    getHospitals();
    setRefreshing(false);
  };

  // Load hospitals on component mount
  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <View>
      <Header title={"Hospital screen"} showBackButton={false} />
      <View style={styles.containerItem}>
        <InputSearch searchQuery={searchQuery} setSearchQuery={handleSearchChange} /> 
        
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            style={styles.listView}
            data={filteredHospitals}
            ListEmptyComponent={<Text>Không có bệnh viện nào.</Text>}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <Item_Hospital_Card_View data={item} />
              </View>
            )}
            refreshing={refreshing} // Connect refresh state
            onRefresh={onRefresh} // Connect pull-to-refresh
          />
        )}
      </View>
    </View>
  );
};

export default HospitalScreen;

const styles = StyleSheet.create({
  Bg: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  containerItem: {},
  listView: {
    height: '82%',
  },
});
