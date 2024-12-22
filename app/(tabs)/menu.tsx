import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function TabTwoScreen() {
  // Animation setup for scaling the image
  const scale = useSharedValue(1); // Initial scale value

  useEffect(() => {
    // Animation to grow and shrink the image
    scale.value = withRepeat(withTiming(2.3, { duration: 1500 }), -1, true); // Repeat animation
  }, []);

  // Animated style for scaling the image
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Array of button data with name and corresponding function
  const buttons = [
    { name: 'Learn Cardiac cycle', onPress: () => {router.push('/guide')} },
    { name: 'Play With Cardiac', onPress: () => {router.push('/PWC')}  },
    { name: 'Visualize Your ECG', onPress: () =>{router.push('/visualize')} },
    // { name: 'Button 4', onPress: () => alert('Button 4 pressed') },
  ];

  return (
    <View style={styles.container}>
      {/* Left Half */}
      <View style={styles.leftContainer}>
        {/* Animated Image in the center */}
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <Image
            source={require('@/assets/images/Heart.png')} // Replace with your image path
            style={styles.image}
          />
        </Animated.View>
      </View>

      {/* Right Half */}
      <View style={styles.rightContainer}>
        {/* Render buttons dynamically based on the 'buttons' array */}
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress} // Call the specific function when the button is pressed
          >
            <Text style={styles.buttonText}>{button.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 150, // Adjust the size of the container
    height: 150, // Adjust the size of the container
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75, // Circular image
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
