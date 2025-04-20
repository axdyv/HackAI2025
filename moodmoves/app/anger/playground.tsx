import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AngerPlayground() {
  const router = useRouter();

  // Wave animation setup
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <View style={styles.container}>
      {/* Animated ocean background */}
      <Animated.View
        style={[
          styles.waveLayer,
          {
            transform: [{ translateX: waveTranslate }],
          },
        ]}
      />

      {/* Title */}
      <Text style={styles.title}>Anger Playground 🌊</Text>
      <Text style={styles.subtitle}>Tap an object to begin</Text>

      {/* Interactive emoji buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.modeButton} onPress={() => router.push('/anger/skip')}>
          <Text style={styles.emoji}>🪨</Text>
          <Text style={styles.label}>Skip Thoughts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modeButton} onPress={() => router.push('/anger/driftwood')}>
          <Text style={styles.emoji}>🪵</Text>
          <Text style={styles.label}>Driftwood Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modeButton} onPress={() => router.push('/anger/bubbles')}>
          <Text style={styles.emoji}>🫧</Text>
          <Text style={styles.label}>Bubble Breath</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modeButton} onPress={() => router.push('/anger/chimes')}>
          <Text style={styles.emoji}>🎐</Text>
          <Text style={styles.label}>Wind Chimes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f1f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  waveLayer: {
    position: 'absolute',
    bottom: 0,
    height: 120,
    width: width * 2,
    backgroundColor: '#a2d2ff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    opacity: 0.7,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d3557',
  },
  subtitle: {
    fontSize: 16,
    color: '#457b9d',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  modeButton: {
    alignItems: 'center',
    margin: 15,
  },
  emoji: {
    fontSize: 40,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
  },
});
