import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

const speakAndDisplayText = (paragraph : any, setDisplayedText : any) => {
  setDisplayedText(''); // Reset text every time screen is opened
  let voice;
  
  if (Platform.OS === 'ios') {
    // iOS specific male voice
    voice = 'com.apple.speech.synthesis.voice.Alex'; // Male voice on iOS
  } else if (Platform.OS === 'android') {
    // Android specific male voice
    voice = 'en-us'; // You can try changing this to another male voice on Android
  }
  
  // Speech synthesis
  Speech.speak(paragraph, {
    voice: voice,
    rate: 1.1, // Adjust speed of speech (1.0 is normal, 1.5 is faster)
  });

  // Text display with interval
  let index = 0;
  const interval = setInterval(() => {
    setDisplayedText((prev  : number) => prev + paragraph[index]);
    index += 1;
    if (index === paragraph.length - 1) {
      clearInterval(interval); // Stop when all text is displayed
    }
  }, 45); // Delay of 45ms per character

  return () => clearInterval(interval); // Clean up interval on component unmount
};
