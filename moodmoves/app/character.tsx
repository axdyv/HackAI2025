import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const avatars = ['🐱', '🧙‍♀️', '🤖', '🧑‍🚀', '🦸', '🐉'];

export default function CharacterScreen() {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const router = useRouter();

  const saveProfile = async () => {
    if (!name || !selectedAvatar) {
      Alert.alert('Oops', 'Please choose both a name and an avatar.');
      return;
    }

    const profile = {
      name,
      avatar: selectedAvatar,
      level: 1,
      xp: 0,
    };

    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    router.replace('/'); // Go back to home or game hub
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Character</Text>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Choose an Avatar:</Text>
      <View style={styles.avatarRow}>
        {avatars.map((a) => (
          <TouchableOpacity key={a} onPress={() => setSelectedAvatar(a)} style={styles.avatar}>
            <Text style={[styles.avatarText, selectedAvatar === a && styles.selectedAvatar]}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveText}>Start Your Journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdf6ec' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 18, marginTop: 20, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, width: '80%', fontSize: 16 },
  avatarRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10 },
  avatar: { padding: 10 },
  avatarText: { fontSize: 36 },
  selectedAvatar: { borderWidth: 2, borderColor: '#e63946', borderRadius: 10 },
  saveButton: { marginTop: 30, backgroundColor: '#e63946', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10 },
  saveText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
