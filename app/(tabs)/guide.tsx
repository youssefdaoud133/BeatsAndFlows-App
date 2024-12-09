// // GuideScreen.js
// import { useFonts } from 'expo-font';
// import React from 'react';
// import { View, StyleSheet, ImageBackground } from 'react-native';
// import LeftRectangle from '../../components/LeftRectangle'; // Import LeftRectangle
// import RightRectangle from '../../components/RightRectangle'; // Import RightRectangle
// const imageSource: any = require('@/assets/images/Guide/ECG.jpg');

// export default function GuideScreen() {
//   const [fontsLoaded] = useFonts({
//     Comic: require('../../assets/fonts/Comic.ttf'),
//   });
//   const handleNextButtonClick = () => {
//     console.log('Next button clicked!');
//     // Perform any action you want when the button is clicked.
//     // For example, change the paragraph or navigate to another screen.
//   };

//   const paragraph =
//     "  Everyone has seen an ECG in movies or heard its rhythmic beeping, but what does it actually represent? Embark on an exciting journey to uncover the secrets of the heart and understand the ECG like never before. Dive into our interactive learning experience and discover how your heart truly beats!";

//   return (
//     <ImageBackground
//       source={require('@/assets/images/GuideBackground.jpg')}
//       style={styles.background}
//     >
//       <View style={styles.container}>
//         <View style={styles.outerRectangle}>
//           <LeftRectangle  paragraph={paragraph} imagePath= {imageSource}/>
//           <View style={styles.dividerLine} />
//           <RightRectangle paragraph={paragraph}  onNextButtonClick={handleNextButtonClick} 
// />
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   outerRectangle: {
//     width: 700,
//     height: 300,
//     borderWidth: 4,
//     borderColor: 'black',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   dividerLine: {
//     width: 3,
//     backgroundColor: 'black',
//   },
// });


import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LeftRectangle from '../../components/LeftRectangle';
import RightRectangle from '../../components/RightRectangle';
import { router } from 'expo-router';

export default function GuideScreen() {
  const [fontsLoaded] = useFonts({
    Comic: require('../../assets/fonts/Comic.ttf'),
  });

  // Sample data for left and right rectangles
  const leftData = [
    {
      bottomText : "ECG" ,
      paragraph: "Discover the rhythm of the heart and decode its messages.",
      fallbackImagePath: require('@/assets/images/Guide/ECG.jpg'),
    },
    {
      bottomText : "Atrial Systole phase" ,
      fallbackImagePath: require('@/assets/images/Guide/P11.png'),

    //   animationPath: require('@/assets/images/Guide/phases-ecg.lottie.json'),
    },
    {
        bottomText : "Isovolumetric Ventricular Phase" ,
        fallbackImagePath: require('@/assets/images/Guide/P2.png'),
  
      //   animationPath: require('@/assets/images/Guide/phases-ecg.lottie.json'),
      },
      {
        bottomText : "Ventricular Ejection Phase" ,
        fallbackImagePath: require('@/assets/images/Guide/P3.png'),
  
      //   animationPath: require('@/assets/images/Guide/phases-ecg.lottie.json'),
      },
      {
        bottomText : "Ventricular Relaxation" ,
        fallbackImagePath: require('@/assets/images/Guide/P4.png'),
  
      //   animationPath: require('@/assets/images/Guide/phases-ecg.lottie.json'),
      },
      {
        bottomText : "Ventricular Filling Phase" ,
        fallbackImagePath: require('@/assets/images/Guide/P5.png'),
  
      //   animationPath: require('@/assets/images/Guide/phases-ecg.lottie.json'),
      },
      {
        bottomText : "All Phases" ,
        // phases-ecg-v2.lottie.json
        animationPath: require('@/assets/images/Guide/heart-beating.lottie.json'),
      },
      {
      bottomText : "ECG Phases" ,
      animationPath: require('@/assets/images/Guide/phases-ecg-v2.lottie.json'),
    },
  ];

  const rightData = [
    {
      title:  "Introduction",
      paragraph: "  Everyone has seen an ECG in movies or heard its rhythmic beeping, but what does it actually represent? Embark on an exciting journey to uncover the secrets of the heart and understand the ECG like never before. Dive into our interactive learning experience and discover how your heart truly beats!"
      ,
    //   imagePath: require('@/assets/images/Guide/ECG.jpg'),
    },
    {
      title:  "Phases of the Cardiac Cycle",
      paragraph: " The cardiac cycle consists of five phases that ensure effective blood flow through the heart. Atrial systole is the phase where the atria contract, filling the ventricles with blood. This is followed by isovolumetric ventricular contraction, where the ventricles contract, but no blood is ejected yet as the valves remain closed. In the ventricular ejection phase, the ventricles pump blood into the aorta and pulmonary artery as the semilunar valves open. Afterward, during isovolumetric ventricular relaxation, the ventricles relax, and all valves are closed, preparing for the next cycle. Finally, ventricular filling occurs as the AV valves open, allowing blood to passively flow from the atria into the ventricles, completing the cycle and preparing for the next heartbeat.",
    //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
    },
    {
        title:  "Phases of the Cardiac Cycle",
        paragraph: " The cardiac cycle consists of five phases that ensure effective blood flow through the heart. Atrial systole is the phase where the atria contract, filling the ventricles with blood. This is followed by isovolumetric ventricular contraction, where the ventricles contract, but no blood is ejected yet as the valves remain closed. In the ventricular ejection phase, the ventricles pump blood into the aorta and pulmonary artery as the semilunar valves open. Afterward, during isovolumetric ventricular relaxation, the ventricles relax, and all valves are closed, preparing for the next cycle. Finally, ventricular filling occurs as the AV valves open, allowing blood to passively flow from the atria into the ventricles, completing the cycle and preparing for the next heartbeat.",
        //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
      },
      {
        title:  "Phases of the Cardiac Cycle",
        paragraph: " The cardiac cycle consists of five phases that ensure effective blood flow through the heart. Atrial systole is the phase where the atria contract, filling the ventricles with blood. This is followed by isovolumetric ventricular contraction, where the ventricles contract, but no blood is ejected yet as the valves remain closed. In the ventricular ejection phase, the ventricles pump blood into the aorta and pulmonary artery as the semilunar valves open. Afterward, during isovolumetric ventricular relaxation, the ventricles relax, and all valves are closed, preparing for the next cycle. Finally, ventricular filling occurs as the AV valves open, allowing blood to passively flow from the atria into the ventricles, completing the cycle and preparing for the next heartbeat.",
        //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
      },
      {
        title:  "Phases of the Cardiac Cycle",
        paragraph: " The cardiac cycle consists of five phases that ensure effective blood flow through the heart. Atrial systole is the phase where the atria contract, filling the ventricles with blood. This is followed by isovolumetric ventricular contraction, where the ventricles contract, but no blood is ejected yet as the valves remain closed. In the ventricular ejection phase, the ventricles pump blood into the aorta and pulmonary artery as the semilunar valves open. Afterward, during isovolumetric ventricular relaxation, the ventricles relax, and all valves are closed, preparing for the next cycle. Finally, ventricular filling occurs as the AV valves open, allowing blood to passively flow from the atria into the ventricles, completing the cycle and preparing for the next heartbeat.",
        //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
      },
      {
        title:  "Phases of the Cardiac Cycle",
        paragraph: " The cardiac cycle consists of five phases that ensure effective blood flow through the heart. Atrial systole is the phase where the atria contract, filling the ventricles with blood. This is followed by isovolumetric ventricular contraction, where the ventricles contract, but no blood is ejected yet as the valves remain closed. In the ventricular ejection phase, the ventricles pump blood into the aorta and pulmonary artery as the semilunar valves open. Afterward, during isovolumetric ventricular relaxation, the ventricles relax, and all valves are closed, preparing for the next cycle. Finally, ventricular filling occurs as the AV valves open, allowing blood to passively flow from the atria into the ventricles, completing the cycle and preparing for the next heartbeat.",
        //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
      },
      {
        title:  "Phases of the Cardiac Cycle",
        paragraph: " Notice the difference between the phases."
        //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
      },
      {
        title:  "Phases of the ECG",
        paragraph: "  Notice how the ECG is drawn."
        //   imagePath: require('@/assets/images/Guide/ECG4.jpg'),
      },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      // If we are at the last index, navigate to the home page or reset index to 0
      if (prevIndex === leftData.length - 1) {
        // Call the navigation function to go to the home page (if you're using React Navigation)
        navigateToHomePage(); // Replace this with your actual navigation function
        return prevIndex; // Prevent incrementing the index
      } else {
        // Otherwise, increment the index and loop back to the start if at the end of the array
        return (prevIndex + 1) % leftData.length;
      }
    });
  };
  
  // Example navigation function, you should implement the actual navigation
  const navigateToHomePage = () => {
    // Example of using React Navigation (adjust according to your setup)
    router.push('/');  // Ensure 'navigation' is available from props or context
  };

  const handleBackButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ?  prevIndex: prevIndex - 1;
    });
  };
  
  return (
    <ImageBackground
      source={require('@/assets/images/GuideBackground.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.outerRectangle}>
          <LeftRectangle
            bottomText={leftData[currentIndex].bottomText}
            paragraph={leftData[currentIndex].paragraph}
            fallbackImagePath={leftData[currentIndex].fallbackImagePath}
            animationPath = {leftData[currentIndex].animationPath}
          />
          <View style={styles.dividerLine} />
          <RightRectangle
            title = {rightData[currentIndex].title}
            paragraph={rightData[currentIndex].paragraph}
            onNextButtonClick={handleNextButtonClick}
            onBackButtonClick={handleBackButtonClick}

          />
        </View>
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
  outerRectangle: {
    width: 700,
    height: 300,
    borderWidth: 4,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dividerLine: {
    width: 3,
    backgroundColor: 'black',
  },
});

