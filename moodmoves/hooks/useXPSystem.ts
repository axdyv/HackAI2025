import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Profile = {
    name: string;
    avatar: string;
    level: number;
    xp: number;
    equippedItems?: {
      head?: string;
      hand?: string;
    };
  };
  

export default function useXPSystem() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async (updated: Profile) => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(updated));
    setProfile(updated);
  };

  const addXP = async (amount: number) => {
    if (!profile) return;

    const xpPerLevel = 100;
    let newXP = profile.xp + amount;
    let newLevel = profile.level;

    while (newXP >= xpPerLevel) {
      newXP -= xpPerLevel;
      newLevel += 1;
    }

    const updated = { ...profile, xp: newXP, level: newLevel };
    await saveProfile(updated);
  };

  function calculateXP(wave: number): number {
    if (wave <= 5) {
      return Math.min(2 ** (wave - 1), 16); // 1, 2, 4, 8, 16
    } else if (wave <= 10) {
      return 20;
    } else if (wave <= 15) {
      return 25;
    } else {
      return 25; // cap
    }
  }
  

  return {
    profile,
    addXP,
    calculateXP
  };
}
