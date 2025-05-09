import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      const profile = await AsyncStorage.getItem('userProfile');
      if (!profile) {
        router.replace('/character');
      }
    };
    checkProfile();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Choose Your Mood</ThemedText>
        <View style={styles.buttonContainer}>
          <Link href="/anger/playground" asChild>
            <Button title="Anger" color="#FF6347" />
          </Link>
          <Link href="/sad" asChild>
            <Button title="Sadness" color="#4682B4" />
          </Link>
          <Link href="/anxiety" asChild>
            <Button title="Anxiety" color="#9b59b6" />
          </Link>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
