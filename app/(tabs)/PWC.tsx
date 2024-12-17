import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TabTwoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Left Half */}
      <View style={styles.leftContainer}>
        {/* Place for your image or content */}
      </View>

      {/* Right Half */}
      <View style={styles.rightContainer}>
        {/* Image in the center */}
        <Image
          source={require('@/assets/images/luckywheel.png')} // Replace with your PNG image path
          style={styles.image}
        />

        {/* Button at the bottom */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    backgroundColor: '#A2272C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#FAE8D5',
    justifyContent: 'space-between', // Space between the image and button
    alignItems: 'center',
    paddingBottom: 20, // Adds space at the bottom for the button
    paddingTop: 50, // Adds space at the top for the image
  },
  image: {
    width: 150, // Adjust the size of the image as needed
    height: 150,
    borderRadius: 75, // Makes the image circular (optional)
  },
  button: {
    backgroundColor: '#B23B4B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#FAE8D5',
    fontWeight: 'bold',
  },
});

export default TabTwoScreen;
