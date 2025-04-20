import React, { useRef, useState, useEffect } from 'react';
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

const affirmations = [
  "You're doing really well.",
  "Letting go feels peaceful.",
  "This moment is yours.",
  "You are not your anger.",
  "Every breath brings calm.",
  "You're safe. You're grounded.",
  "It's okay to release and rest.",
];

export default function SkipThoughtScreen() {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const affirmationOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(1)).current;

  const [skipped, setSkipped] = useState(false);
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowScale, {
          toValue: 1.15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSkip = () => {
    setSkipped(false);
    translateX.setValue(0);
    translateY.setValue(0);
    opacity.setValue(1);

    Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, { toValue: -80, duration: 150, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -160, duration: 180, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -220, duration: 150, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -270, duration: 120, useNativeDriver: true }),
        ]),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
      .start(() => {
      setSkipped(true);
      const random = affirmations[Math.floor(Math.random() * affirmations.length)];
      setAffirmation(random);

      affirmationOpacity.setValue(0);
      Animated.sequence([
        Animated.timing(affirmationOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(affirmationOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        rippleScale.setValue(0);
        rippleOpacity.setValue(0);
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Skip the Thought</Text>
        <Text style={styles.subtitle}>Tap the stone to skip it across the water</Text>
      </View>

      {/* Skipping area */}
      <View style={styles.skipZone}>
        {/* Affirmation Bubble */}
{affirmation !== '' && (
  <Animated.View
    style={[
      styles.affirmationBubble,
      {
        transform: [{ scale: glowScale }],
        opacity: affirmationOpacity,
      },
    ]}
  >
    {/* Ripple inside the bubble */}
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ripple,
        {
          transform: [{ scale: rippleScale }],
          opacity: rippleOpacity,
        },
      ]}
    />

    <Animated.Text
      style={[
        styles.affirmationText,
        { opacity: affirmationOpacity },
      ]}
    >
      {affirmation}
    </Animated.Text>
  </Animated.View>
)}


        {/* Stone */}
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

      {/* Back */}
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
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d3557',
  },
  subtitle: {
    fontSize: 16,
    color: '#457b9d',
    marginTop: 4,
  },
  skipZone: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  stone: {
    position: 'absolute',
    bottom: 40,
    left: width / 2 - 20,
    zIndex: 5,
  },
  affirmationBubble: {
    position: 'absolute',
    top: 140,
    backgroundColor: '#cdeefd',
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    alignSelf: 'center',
    minWidth: width * 0.6,
  },
  
  affirmationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2a9d8f',
    textAlign: 'center',
  },
  
  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#90e0ef',
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  
  glow: {
    position: 'absolute',
    top: 160,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#cdeefd',
    opacity: 0.4,
    zIndex: 0,
    alignSelf: 'center',
  },
  
  affirmation: {
    position: 'absolute',
    top: 170,
    width: width * 0.8,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2a9d8f',
    zIndex: 2,
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
