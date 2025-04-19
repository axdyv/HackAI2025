import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  level: number;
  xp: number;
};

export default function XPBar({ level, xp }: Props) {
  const progress = xp / 100;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.level}>Lvl {level}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.xp}>{xp}/100 XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', marginTop: 20 },
  level: { fontSize: 18, fontWeight: 'bold' },
  bar: {
    width: 200,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 6,
  },
  fill: {
    height: 10,
    backgroundColor: '#2a9d8f',
  },
  xp: { fontSize: 14, color: '#555' },
});
