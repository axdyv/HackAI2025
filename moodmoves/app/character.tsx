import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useXPSystem from '@/hooks/useXPSystem';
import XPBar from '@/components/XPBar';

export default function CharacterOverview() {
  const { profile } = useXPSystem();

  const handleInteract = (type: string) => {
    switch (type) {
      case 'pet':
        Alert.alert('😊', `${profile?.name} feels loved!`);
        break;
      case 'cheer':
        Alert.alert('💖', `${profile?.name} says: You got this!`);
        break;
      default:
        Alert.alert('🤖', 'Hello, human.');
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading character...</Text>
      </View>
    );
  }

  const equipped = profile.equippedItems || {};

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>
        {profile.avatar}
        {equipped.head ?? ''}
      </Text>
      <Text style={styles.name}>{profile.name}</Text>

      <XPBar level={profile.level} xp={profile.xp} />

      <Text style={styles.subheading}>Equipped Items:</Text>
      <Text style={styles.item}>🧢 Head: {equipped.head ?? 'None'}</Text>
      <Text style={styles.item}>🖐 Hand: {equipped.hand ?? 'None'}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handleInteract('pet')}>
          <Text style={styles.buttonText}>Pet 🤗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInteract('cheer')}>
          <Text style={styles.buttonText}>Cheer Up 🌟</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fef6e4', alignItems: 'center', justifyContent: 'center', padding: 24 },
  avatar: { fontSize: 64 },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subheading: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  item: { fontSize: 16, marginTop: 4 },
  buttons: { flexDirection: 'row', marginTop: 30, gap: 16 },
  button: { backgroundColor: '#e63946', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  message: { fontSize: 18, color: '#888' },
});
