import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, Platform } from 'react-native';
import useBalloonWave from '@/components/useBalloonWave';
import Balloon from '@/components/Balloon';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function AngerScreen() {
  const { wave, balloons, popBalloon } = useBalloonWave();
  const [tapPos, setTapPos] = useState({ x: -9999, y: -9999 });

  const handleTap = (x: number, y: number) => {
    setTapPos({ x, y });

    // Check which balloon was tapped
    for (let b of balloons) {
      if (b.popped) continue;

      const balloonCenterX = b.x + b.size / 2;
      const balloonCenterY = SCREEN_HEIGHT * 0.7;
      const dx = x - balloonCenterX;
      const dy = y - balloonCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < b.size / 2 + 10) {
        popBalloon(b.id);
        return;
      }
    }
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderRelease={(e) => {
        const { locationX, locationY } = e.nativeEvent;
        handleTap(locationX, locationY);
      }}
    >
      <Text style={styles.title}>Anger Mode 🎯</Text>
      <Text style={styles.subtitle}>Wave {wave}: Pop the balloons!</Text>

      <View style={styles.balloonArea}>
        {balloons.map((b) =>
          b.popped ? null : (
            <Balloon
              key={b.id}
              x={b.x}
              size={b.size}
              animY={b.animY}
              onPop={() => popBalloon(b.id)}
            />
          )
        )}

        {/* Crosshair for web */}
        {Platform.OS === 'web' && (
          <View
            style={[
              styles.crosshair,
              { left: tapPos.x - 10, top: tapPos.y - 10 },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe5e5',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e63946',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 20,
  },
  balloonArea: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  crosshair: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'transparent',
    zIndex: 9999,
    pointerEvents: 'none',
  },
});
