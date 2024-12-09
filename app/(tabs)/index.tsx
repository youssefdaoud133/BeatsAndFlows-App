import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from 'expo-av';
import { Link } from 'expo-router';  // Import Link from expo-router
import { useFonts } from 'expo-font';

export default function HomeScreen() {
  const router = useRouter(); // Use router for navigation
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined); // State for sound



  useEffect(() => {
    // Unlock orientation to allow flexibility
    ScreenOrientation.unlockAsync();

    return () => {
      // Lock the orientation back to portrait upon unmount
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // Function to play button sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/Button.mp3') // Replace with your sound file path
    );
    setSound(sound);
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
        {/* <Link href="/guide"   style={styles.startButton}>
            <Text style={styles.startButtonText} >Go to the Guide!</Text>
        </Link> */}

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
