import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { usePathname, useRouter } from 'expo-router';

export default function FloatingCharacterButton() {
  const pathname = usePathname();
  const router = useRouter();

  // Don’t show if we're already on the character screen
  if (pathname === '/character') return null;

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push('/character')}>
      <Text style={styles.icon}>🧍</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 999,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 2 } },
      android: { shadowOffset: { width: 0, height: 2 } },
    }),
  },
  icon: {
    fontSize: 24,
  },
});
