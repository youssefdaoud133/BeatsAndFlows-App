import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from 'expo-av'; // Import Audio from expo-av

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined); // Type state correctly

  useEffect(() => {
    // Lock the orientation to portrait or landscape as needed
    ScreenOrientation.unlockAsync(); // Unlocks all orientations (portrait + landscape)

    return () => {
      // You can lock the orientation back to portrait if needed
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // Function to play sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/Button.mp3') // Replace with your sound file path
    );
    setSound(sound);
    await sound.playAsync(); // Play the sound
  };

  const handleStartPress = () => {
    playSound(); // Play sound when button is clicked
    console.log("Start button pressed");
  };

  return (
    <ImageBackground
      source={require('@/assets/images/BackgroundForHome.png')}  // Add your image path here
      style={styles.background}
    >
      <View style={styles.container}>
        {/* <Text style={styles.text}>Home Screen</Text> */}
        
        {/* Custom 'Start' Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Makes the background cover the entire screen
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensures the container spans the whole screen
  },
  text: {
    fontSize: 24,
    color: 'white', // Choose text color that contrasts with your background
  },
  startButton: {
    backgroundColor: '#B23B4B', // Red background color similar to the image
    paddingVertical: 15, // Vertical padding for button height
    paddingHorizontal: 30, // Horizontal padding for button width
    borderRadius: 10, // Rounded corners
    // marginTop: 20, // Space between the text and button
  },
  startButtonText: {
    fontSize: 24,
    color: '#FAE8D5', // Light color for text
    fontWeight: 'bold', // Make the text bold
    textAlign: 'center', // Center the text
  },
});
