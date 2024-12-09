import React from 'react';
import { View, Text, StyleSheet, Image as RNImage } from 'react-native';
import LottieView from 'lottie-react-native';

const LeftRectangle = ({ paragraph, animationPath, fallbackImagePath, bottomText }: any) => {
  return (
    <View style={styles.leftRectangle}>
      <View style={styles.topSection}>
        <RNImage
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.middleSection}>
        {animationPath ? (
          <LottieView
            source={animationPath} // JSON animation file path
            autoPlay
            loop
            style={styles.middleAnimation}
          />
        ) : (
          <RNImage
            source={fallbackImagePath} // Fallback to a static image
            style={styles.middleImage}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>{bottomText}</Text> {/* Dynamic bottom text */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftRectangle: {
    flexDirection: 'column',
    flex: 1,
  },
  topSection: {
    height: '20%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  middleSection: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleAnimation: {
    width: '100%',
    height: '100%',
  },
  middleImage: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 18,
    color: '#B23B4B',
  },
});

export default LeftRectangle;
