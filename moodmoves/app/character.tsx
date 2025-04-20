import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XPBar from '@/components/XPBar';

const defaultProfile = {
  name: 'Buddy',
  level: 2,
  xp: 30,
  avatar: '🐶',
  equippedItems: {
    head: '🎩',
    hand: '🛡️',
  },
};

const avatarOptions = ['🐶', '🐱', '🐵', '🧙', '🧛', '🧞'];
const headOptions = ['🎩', '🧢', '⛑️', '👑', 'None'];
const handOptions = ['🛡️', '⚔️', '📚', '🎨', 'None'];

export default function CharacterOverview() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [usedPet, setUsedPet] = useState(false);
  const [usedCheer, setUsedCheer] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const saved = await AsyncStorage.getItem('customProfile');
      if (saved) setProfile(JSON.parse(saved));
    };
    loadProfile();
  }, []);

  const saveProfile = async (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
    await AsyncStorage.setItem('customProfile', JSON.stringify(updatedProfile));
  };

  const xpRequiredForNextLevel = (level: number) => {
    return 20 * level; // simple scaling rule: level 3 ➝ 60 XP, level 4 ➝ 80 XP
  };

  const gainXP = (amount: number) => {
    let { xp, level } = profile;
    xp += amount;

    let neededXP = xpRequiredForNextLevel(level);

    while (xp >= neededXP) {
      xp -= neededXP;
      level += 1;
      neededXP = xpRequiredForNextLevel(level);
    }

    saveProfile({ ...profile, xp, level });
  };

  const handleInteract = (type: string) => {
    if (type === 'pet') {
      if (usedPet) {
        Alert.alert('⚠️', `You've already petted ${profile.name} this session!`);
        return;
      }
      setUsedPet(true);
      gainXP(10);
      Alert.alert('😊', `${profile.name} feels loved! +10 XP`);
    } else if (type === 'cheer') {
      if (usedCheer) {
        Alert.alert('⚠️', `${profile.name} is already cheering you on!`);
        return;
      }
      setUsedCheer(true);
      gainXP(10);
      Alert.alert('💖', `${profile.name} says: You got this! +10 XP`);
    } else {
      Alert.alert('🤖', 'Hello, human.');
    }
  };

  const equipped = profile.equippedItems || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.avatar}>
        {profile.avatar} {equipped.head !== 'None' ? equipped.head : ''}
      </Text>
      <Text style={styles.name}>{profile.name}</Text>

      <XPBar 
      level={profile.level} 
      xp={profile.xp} 
      xpToNextLevel={xpRequiredForNextLevel(profile.level)} 
      />

      <Text style={styles.subheading}>Equipped Items:</Text>
      <Text style={styles.item}>🧢 Head: {equipped.head}</Text>
      <Text style={styles.item}>🖐 Hand: {equipped.hand}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handleInteract('pet')}>
          <Text style={styles.buttonText}>Pet 🤗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInteract('cheer')}>
          <Text style={styles.buttonText}>Cheer Up 🌟</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
        <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit Character ✏️'}</Text>
      </TouchableOpacity>

      {isEditing && (
        <View style={styles.editor}>
          <Text style={styles.sectionTitle}>Choose Avatar</Text>
          <View style={styles.choices}>
            {avatarOptions.map((emoji) => (
              <TouchableOpacity key={emoji} onPress={() => saveProfile({ ...profile, avatar: emoji })}>
                <Text style={styles.choice}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Choose Hat</Text>
          <View style={styles.choices}>
            {headOptions.map((hat) => (
              <TouchableOpacity key={hat} onPress={() => saveProfile({
                ...profile,
                equippedItems: { ...profile.equippedItems, head: hat === 'None' ? '' : hat },
              })}>
                <Text style={styles.choice}>{hat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Choose Hand Item</Text>
          <View style={styles.choices}>
            {handOptions.map((item) => (
              <TouchableOpacity key={item} onPress={() => saveProfile({
                ...profile,
                equippedItems: { ...profile.equippedItems, hand: item === 'None' ? '' : item },
              })}>
                <Text style={styles.choice}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    backgroundColor: '#fff', // 👈 Add this line
  },
  
  avatar: { fontSize: 64 },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subheading: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  item: { fontSize: 16, marginTop: 4 },
  buttons: { flexDirection: 'row', marginTop: 30, gap: 16 },
  button: { backgroundColor: '#e63946', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  editButton: { marginTop: 24, backgroundColor: '#457b9d', padding: 12, borderRadius: 10 },
  editor: { marginTop: 20, width: '100%' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  choice: { fontSize: 32, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 10 },
});
