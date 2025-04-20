import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Button, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem('userProfile');
        const hasSeenCharacter = await AsyncStorage.getItem('hasSeenCharacter');

        if (!profile && !hasSeenCharacter) {
          await AsyncStorage.setItem('hasSeenCharacter', 'true');
          router.push('/character');
        }
      } catch (error) {
        console.error('Error checking profile:', error);
      }
    };
    checkProfile();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
        resizeMode="contain"
      />

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginTop: 30,
    width: '100%',
  },
  reactLogo: {
    height: 160,
    width: 260,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
});