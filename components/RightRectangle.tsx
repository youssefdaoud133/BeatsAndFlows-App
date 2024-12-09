import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

const RightRectangle = ({ title, paragraph, onNextButtonClick, onBackButtonClick }: any) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);

  useEffect(() => {
    setDisplayedText(''); // Reset text every time screen is opened
    setIsTextComplete(false); // Disable the button until text is complete
    let voice;

    if (Platform.OS === 'ios') {
      voice = 'com.apple.speech.synthesis.voice.Alex';
    } else if (Platform.OS === 'android') {
      voice = 'en-us';
    }

    // Optional: Uncomment to enable text-to-speech
    Speech.speak(paragraph, {
      voice: voice,
      rate: 1.2,
    });

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + paragraph[index]);
      index += 1;
      if (index === paragraph.length - 1) {
        clearInterval(interval);
        setIsTextComplete(true); // Enable the button when text is fully displayed
      }
    }, 45);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [paragraph]);

  return (
    <View style={styles.rightRectangle}>
      <View style={styles.topSection}>
        <Text style={styles.text}>{title}</Text> {/* Dynamic title */}
      </View>

      <ScrollView style={styles.middleRightSection}>
        <Text style={styles.paragraphText}>{displayedText}</Text>
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: isTextComplete ? '#fff8ed' : '#d3d3d3' }, // Change color based on state
            ]}
            onPress={onBackButtonClick}
            disabled={!isTextComplete} // Disable the button until text is complete
          >
            <Text
              style={[
                styles.nextButtonText,
                { color: isTextComplete ? '#B23B4B' : '#888888' }, // Adjust text color for disabled state
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: isTextComplete ? '#fff8ed' : '#d3d3d3' }, // Change color based on state
            ]}
            onPress={onNextButtonClick}
            disabled={!isTextComplete} // Disable the button until text is complete
          >
            <Text
              style={[
                styles.nextButtonText,
                { color: isTextComplete ? '#B23B4B' : '#888888' }, // Adjust text color for disabled state
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>

          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightRectangle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  topSection: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRightSection: {
    padding: 4,
    height: '60%',
    width: '100%', // Make sure ScrollView takes full width
  },
  paragraphText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Comic',
    textAlign: 'left',
    lineHeight: 15,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  bottomSection: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingHorizontal: 10,
  },
  nextButton: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3, // Adding shadow for better look
    margin: 5,
  },
  nextButtonText: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RightRectangle;
