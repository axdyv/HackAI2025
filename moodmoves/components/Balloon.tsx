import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

type BalloonProps = {
  x: number;
  size: number;
  animY: Animated.Value;
  onPop: () => void;
};

export default function Balloon({ x, size, animY, onPop }: BalloonProps) {
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animY, {
          toValue: -50,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: 0,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.balloon,
        {
          left: x,
          transform: [{ translateY: animY }],
        },
      ]}
    >
      <Text
        style={{ fontSize: size }}
        onPress={onPop}
      >
        🎈
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  balloon: {
    position: 'absolute',
    bottom: 100,
  },
});
