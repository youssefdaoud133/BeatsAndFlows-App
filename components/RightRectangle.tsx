import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const RightRectangle = ({ title, paragraph, onNextButtonClick, onBackButtonClick }: any) => {
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined); // State for sound

  useEffect(() => {
    setIsTextComplete(true); // Enable the button immediately
  }, [paragraph]);



  const getRandomColor = () => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`; // Low opacity
    return randomColor;
  };

  const renderParagraphs = () => {
    if (Array.isArray(paragraph)) {
      return paragraph.map((para, index) => (
        <View key={index} style={[styles.paragraphContainer, { backgroundColor: getRandomColor() }]}>
          <Text style={styles.paragraphText}>{para}</Text>
        </View>
      ));
    }
    return (
      <View >
        <Text style={styles.paragraphText}>{paragraph}</Text>
      </View>
    );
  };

  return (
    <View style={styles.rightRectangle}>
      <View style={styles.topSection}>
        <Text style={styles.text}>{title}</Text> {/* Dynamic title */}
      </View>

      <ScrollView style={styles.middleRightSection}>{renderParagraphs()}</ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: isTextComplete ? '#fff8ed' : '#d3d3d3' },
            ]}
            onPress={onBackButtonClick}
          >
            <Text
              style={[
                styles.nextButtonText,
                { color: isTextComplete ? '#B23B4B' : '#888888' },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: isTextComplete ? '#fff8ed' : '#d3d3d3' },
            ]}
            onPress={onNextButtonClick}
          >
            <Text
              style={[
                styles.nextButtonText,
                { color: isTextComplete ? '#B23B4B' : '#888888' },
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
    width: '100%',
  },
  paragraphContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 1, // Shadow for individual paragraphs
  },
  paragraphText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Comic',
    textAlign: 'left',
    lineHeight: 18,
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
    elevation: 3,
    margin: 5,
  },
  nextButtonText: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RightRectangle;
