import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from 'expo-av';

export default function HomeScreen() {
  const router = useRouter(); // Use router for navigation
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined); // State for sound

  useEffect(() => {
    // Unlock orientation to allow flexibility
    ScreenOrientation.unlockAsync();

    // Load and play background music
    const playBackgroundMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/Music.mp3'), // Replace with your music file path
        { shouldPlay: true, isLooping: true } // Automatically play and loop
      );
      setSound(sound);

      // Set the volume to a lower level (e.g., 0.3)
      await sound.setVolumeAsync(0.3);
    };

    playBackgroundMusic();

    return () => {
      // Lock the orientation back to portrait upon unmount
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      
      // Unload the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Function to play button sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/Button.mp3') // Replace with your sound file path
    );
    await sound.playAsync();
  };

  const handleStartPress = async () => {
    await playSound(); // Play sound before navigation
    router.push('/guide'); // Navigate to the Guide tab
  };

  return (
    <ImageBackground
      source={require('@/assets/images/BackgroundForHome.png')} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#B23B4B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 24,
    color: '#FAE8D5',
    fontWeight: 'bold',
  },
});
