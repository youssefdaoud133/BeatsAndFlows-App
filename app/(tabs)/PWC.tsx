import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { Audio } from 'expo-av'; // Import expo-av for audio
import LottieView from 'lottie-react-native'; // Import Lottie animation

const TabTwoScreen: React.FC = () => {
  const [rotateValue] = useState(new Animated.Value(0)); // Start with a rotation value of 0
  const [totalRotation, setTotalRotation] = useState(0); // Track total rotation in state
  const [sound, setSound] = useState<Audio.Sound | null>(null); // State for sound
  const navigation = useNavigation();
  const lottieRef = useRef<LottieView>(null); // Create a ref for LottieView
  const [spinCount, setSpinCount] = useState(0); // Track the number of spins

  // Load sound effect
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/spin.mp3') // Replace with the correct sound path
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when the component is unmounted
      }
    };
  }, []);

  const rotateImage = async () => {
    const newRotation = totalRotation === 0 ? totalRotation + 72 / 2 : totalRotation + 72;

    setTotalRotation(newRotation); // Update total rotation

    // Animate the rotation by adding 72 degrees to the current value
    Animated.timing(rotateValue, {
      toValue: newRotation, // Set the new rotation value
      duration: 500, // Set duration of the animation
      useNativeDriver: true, // Use native driver for performance
    }).start(() => {
      // Stop the sound when the animation ends
      if (sound) {
        sound.stopAsync(); // Stop the sound when the animation ends
      }
    });

    // Play the spin sound
    if (sound) {
      await sound.replayAsync(); // Play the sound (replay it if it was already played)
    }

    // Animate the Lottie animation depending on the spin count
    if (spinCount === 0 && lottieRef.current) {
      // For the first spin, animate from frame 10 to frame 11
      lottieRef.current.play(9, 11); // Play animation from frame 10 to frame 11
    } else if (spinCount === 1 && lottieRef.current) {
      // For the second spin, animate from frame 5 to frame 9
      lottieRef.current.play(5, 9); // Play animation from frame 5 to frame 9
    } else if (spinCount === 2 && lottieRef.current) {
        // For the second spin, animate from frame 5 to frame 9
        lottieRef.current.play(3, 4); // Play animation from frame 5 to frame 9
      
    } else if (spinCount === 3 && lottieRef.current) {
        // For the second spin, animate from frame 5 to frame 9
        lottieRef.current.play(1, 3); // Play animation from frame 5 to frame 9
    }
     else if (spinCount === 4 && lottieRef.current) {
    // For the second spin, animate from frame 5 to frame 9
          lottieRef.current.play(0, 1); // Play animation from frame 5 to frame 9
          setSpinCount(-1) 
        }
    
    else if (lottieRef.current) {
      // For subsequent spins, play the full animation from start
      lottieRef.current.play();
    }

    // Increase spin count after each spin
    setSpinCount(prevCount => prevCount + 1);
  };

  // Reset rotation when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset total rotation value to 0 when the screen is focused
      setTotalRotation(0);
      rotateValue.setValue(0);
      setSpinCount(0); // Reset the spin count on screen focus
    });

    // Cleanup on screen blur
    return unsubscribe;
  }, [navigation, rotateValue]);

  // Interpolate the rotation value to get a rotation transform
  const rotation = rotateValue.interpolate({
    inputRange: [0, 360], // Allow rotation to go up to 360 degrees
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Left Half - Display Lottie Animation in the Center */}
      <View style={styles.leftContainer}>
        {/* Lottie animation (JSON animation saved in a file) */}
        <LottieView
          ref={lottieRef} // Attach the ref to the LottieView component
          source={require('@/assets/json/PWClottie.json')} // Replace with the correct Lottie JSON file path
          autoPlay={false} // Set autoPlay to false so we can control it manually
          loop={false} // Set to false so it doesn't loop automatically
          style={styles.lottieAnimation} // Custom style for the animation
        />
      </View>

      {/* Right Half */}
      <View style={styles.rightContainer}>
        {/* Down Arrow Icon */}
        <Icon name="arrow-down-circle" size={40} color="#B23B4B" style={styles.arrowIcon} />

        {/* Animated Image in the center */}
        <Animated.Image
          source={require('@/assets/images/luckywheel.png')} // Replace with your PNG image path
          style={[styles.image, { transform: [{ rotate: rotation }] }]} // Apply the animated rotation
        />

        {/* Button at the bottom */}
        <TouchableOpacity style={styles.button} onPress={rotateImage}>
          <Text style={styles.buttonText}>Spin</Text>
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    paddingTop: 50,
  },
  lottieAnimation: {
    width: 300, // Set the desired width for your Lottie animation
    height: 300, // Set the desired height for your Lottie animation
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#FAE8D5',
    justifyContent: 'center', // Center the content
    alignItems: 'center',
    paddingBottom: 20, // Adds space at the bottom for the button
    paddingTop: 20, // Adds space at the top for the image
  },
  arrowIcon: {
    marginBottom: 0, // No space between arrow and image
  },
  image: {
    width: 280, // Adjust the size of the image as needed
    height: 240,
    borderRadius: 75, // Makes the image circular (optional)
    marginTop: 0, // Adds a little space between the arrow and the image
  },
  button: {
    backgroundColor: '#B23B4B',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 3,
    width: '27%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    color: '#FAE8D5',
    fontWeight: 'bold',
  },
});

export default TabTwoScreen;
