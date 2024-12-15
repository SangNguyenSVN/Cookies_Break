import { FlatList, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import SubHeading from '@/app/src/shared/SubHeading'

const Slider = ({ data }: any) => {
  console.log(data)
  return (
    <View style={styles.container}>
      <SubHeading title="Tin tức" />
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            style={styles.img}
            source={{ uri: item.sections[1].url }} />
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('screen').width * 0.9,
    height: 170,
    borderRadius: 10,
    margin: 2,

  },
  container: {
    flex: 1,
  }
})