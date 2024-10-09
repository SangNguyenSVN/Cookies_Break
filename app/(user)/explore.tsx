import { StyleSheet, View } from 'react-native';
import React from 'react';
import ExploreNavigation from '../src/navigation/patient/ExploreNavigation';

const Explore = () => { // Capitalize the component name
  return (
    <View style={styles.container}>
      <ExploreNavigation />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes up the full screen
    backgroundColor: '#fff', // Optional: set a background color
  },
});
