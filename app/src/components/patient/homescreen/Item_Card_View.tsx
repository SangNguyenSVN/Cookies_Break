import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Import FontAwesome for icons

const Item_Hospital_Card_View = ({ data }: any) => {

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInnerContainer}>
        
        <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.hospitalImage} source={{ uri: data.image }} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.hospitalName}>{data.name}</Text>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.bookAppointmentButton}>
                <FontAwesome name="calendar" size={16} color="white" />
                <Text style={styles.buttonText}>Đặt lịch</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* No need for lineContainer anymore */}

        <View style={styles.addressContainer}>
          <FontAwesome name="map-marker" size={18} color="black" />
          <Text style={styles.addressText}>
            {data.location}
          </Text>
        </View>
        
      </View>
    </View>
  );
};

export default Item_Hospital_Card_View;

const styles = StyleSheet.create({
  // Card Container
  cardContainer: {
    width: '92%',
    height: 150,
    backgroundColor: '#EBEAEA',
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    flexDirection: 'column',
  },

  cardInnerContainer: {
    flexDirection: 'column',
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Hospital Image Style
  imageContainer: {

  },

  hospitalImage: {
    width: 150,
    height: 100,
    borderRadius: 8, // Add border-radius to make the image rounded
    resizeMode: 'cover', // Make sure the image fills its container
  },

  // Text Container
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
  },

  // Hospital Name Style
  hospitalName: {
    fontSize: 15,
    fontWeight: '400',
  },

  // Button Container (for Booking Appointment)
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },

  // Book Appointment Button Style
  bookAppointmentButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 110,
    height: 26,
    borderRadius: 5,
    backgroundColor: '#489458',
  },

  // Button Icon Style
  icon: {
    width: 18,
    height: 18,
  },

  // Button Text Style
  buttonText: {
    fontSize: 12,
    color: 'white',
  },

  // Address Section Style
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1, // Add border line
    borderColor: 'white', // Light gray color for the line
    paddingBottom: 10, // Padding below the line
  },

  // Address Text Style
  addressText: {
    fontSize: 8,
    fontWeight: '400',
    marginLeft: 5,
    width: 320,
  },
});
