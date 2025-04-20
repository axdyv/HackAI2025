import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SkipThoughtScreen() {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [skipped, setSkipped] = useState(false);

  const handleSkip = () => {
    setSkipped(false);

    translateX.setValue(0);
    translateY.setValue(0);
    opacity.setValue(1);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: width,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -150,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSkipped(true);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skip the Thought</Text>
      <Text style={styles.subtitle}>Tap the stone to skip it across the water</Text>

      <View style={styles.skipZone}>
        <Animated.View
          style={[
            styles.stone,
            {
              transform: [{ translateX }, { translateY }],
              opacity,
            },
          ]}
        >
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ fontSize: 36 }}>🪨</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {skipped && (
        <Text style={styles.message}>You let that thought go. 🌊</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Beach</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f1f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#457b9d',
    marginBottom: 30,
    textAlign: 'center',
  },
  skipZone: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  stone: {
    marginLeft: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#2a9d8f',
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 16,
    color: '#1d3557',
  },
});
