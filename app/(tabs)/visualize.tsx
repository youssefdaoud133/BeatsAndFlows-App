import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Dimensions, Button, StyleSheet } from 'react-native';
import { Svg, Polyline, Rect, Line } from 'react-native-svg';
import LottieView from 'lottie-react-native'; // Ensure you have Lottie installed
import ECGData from '@/assets/ECG/csvjson.json';

// Define the structure of the JSON data
type ECGDataItem = {
  [key: string]: number; // The keys are strings, and the values are numbers
};

const ECGDataComponent: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [ecgData, setEcgData] = useState<number[]>([]);
  const [currentAmplitude, setCurrentAmplitude] = useState<number>(0); // Track current amplitude
  const [currentIndex, setCurrentIndex] = useState<number>(9); // Start at the 10th ECG dataset

  const bottomPadding = 20;
  const sidePadding = 60;
  const width = screenWidth - sidePadding * 2; // Account for left and right padding
  const height = screenHeight * 0.4 - bottomPadding; // Adjusted for more space in landscape

  // Refs for cursor, max peak, and animation
  const cursorX = useRef<number>(0); // Store cursorX as a ref to avoid causing re-renders
  const prevCursorX = useRef<number>(0); // Store previous cursorX to prevent unnecessary updates
  const maxPeakRef = useRef<{ x: number; y: number } | null>(null);
  const lottieRef = useRef<LottieView>(null); // Reference to Lottie animation

  // Normalize ECG Data
  const normalizeData = (data: number[]): number[] => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map((value) => (value - min) / (max - min));
  };

  const loadECGData = (index: number) => {
    const firstRowValues = Object.values(ECGData[index]); // Use the row based on the current index
    const normalized = normalizeData(firstRowValues); // Normalize these values
    const sliceIndex = Math.floor(normalized.length * 0.4); // Calculate 40% of the data length to skip the first part
    const slicedData = normalized.slice(sliceIndex); // Skip the first 40%
    setEcgData(slicedData);
    cursorX.current = 0; // Reset cursor position to the start when data is reloaded
  };

  useEffect(() => {
    loadECGData(currentIndex); // Load data when the component mounts
  }, [currentIndex]); // Reload data when the current index changes

  // Function to find the maximum amplitude and its index
  const findMaxAmplitude = (data: number[]): { x: number; y: number } | null => {
    const maxY = Math.max(...data); // Find the maximum value in the data
    const maxX = data.indexOf(maxY); // Get the index of that maximum value
    return maxY !== -Infinity ? { x: maxX, y: maxY } : null;
  };

  // Cursor movement effect
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      cursorX.current = cursorX.current + 0.5; // Smaller increment for slower movement

      // If the cursor exceeds the width, reset it
      if (cursorX.current > width) {
        cursorX.current = 0;
      }

      // Update amplitude based on cursor position (only when cursorX changes)
      if (cursorX.current !== prevCursorX.current) {
        const index = Math.floor((cursorX.current / width) * ecgData.length);
        setCurrentAmplitude(ecgData[index] * height); // Update amplitude based on cursor position
        prevCursorX.current = cursorX.current; // Update the ref to the current cursorX
      }

      // Check if the cursor has passed the maximum point
      if (maxPeakRef.current) {
        const maxXPosition = maxPeakRef.current.x * (width / ecgData.length);

        // Trigger animation a bit before the max peak
        if (cursorX.current >= maxXPosition - 20 && cursorX.current <= maxXPosition && lottieRef.current) {
          // Start animation slightly before the maximum point and adjust the speed
          lottieRef.current.play();
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [ecgData, width, height]);

  // Detect the maximum amplitude and log it
  useEffect(() => {
    if (ecgData.length === 0) {
      return;
    }

    // Find the maximum amplitude and treat it as the maximum point
    const maxAmplitudePoint = findMaxAmplitude(ecgData);
    if (maxAmplitudePoint) {
      maxPeakRef.current = maxAmplitudePoint; // Store the max peak for later comparison
    }
  }, [ecgData]); // Re-run whenever ecgData changes

  // Convert ECG Data to Path Points
  const points = ecgData
    .map((value, index) => {
      const x = (index / ecgData.length) * width;
      const y = height - value * height; // Scale y to fit the height
      return `${x},${y}`;
    })
    .join(' ');

  const handleNext = () => {
    if (currentIndex < ECGData.length - 1) {
      setCurrentIndex(currentIndex + 1); // Go to the next ECG dataset
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Go to the previous ECG dataset
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Top Half with Lottie Animation */}
      <View style={styles.topContainer}>
        <View style={styles.animationWrapper}>
          {/* Lottie animation (JSON animation saved in a file) */}
          <LottieView
            ref={lottieRef} // Attach the ref to the LottieView component
            source={require('@/assets/json/PWClottie.json')} // Replace with the correct Lottie JSON file path
            autoPlay={false} // Set autoPlay to false so we can control it manually
            loop={false} // Set to false so it doesn't loop automatically
            style={styles.lottieAnimation} // Custom style for the animation
            speed={0.5} // Slower animation speed (adjust as necessary)
          />
        </View>
        {/* Amplitude Text positioned at top left */}
        <Text style={styles.amplitudeText}>Amplitude: {currentAmplitude.toFixed(2)}</Text>
      </View>

      {/* Buttons to Navigate ECG Data */}
      <View style={styles.buttonContainer}>
        <Button title="Previous ECG" onPress={handlePrevious} />
        <Button title="Next ECG" onPress={handleNext} />
      </View>

      {/* Bottom Half - 40% Height */}
      <View style={styles.graphContainer}>
        <Svg height={height} width={width} style={{ backgroundColor: 'white' }}>
          {/* ECG Wave */}
          <Polyline points={points} fill="none" stroke="black" strokeWidth="2" />

          {/* Light / Cursor */}
          <Rect x={cursorX.current} y={0} width={5} height={height} fill="yellow" opacity={0.5} />

          {/* Vertical line at the maximum point */}
          {maxPeakRef.current && (
            <Line
              x1={maxPeakRef.current.x * (width / ecgData.length)} // Position the line at the maximum point's x-coordinate
              y1={0}
              x2={maxPeakRef.current.x * (width / ecgData.length)}
              y2={height}
              stroke="red"
              strokeWidth="2"
            />
          )}
        </Svg>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  amplitudeText: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  animationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
    lottieAnimation: {
      marginTop: 70, // Added margin to adjust its vertical position

      
      width: 250, // Increased size of the heart animation
      height: 200, // Increased size of the heart animation
    },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  graphContainer: {
    flex: 3,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
});


export default ECGDataComponent;
