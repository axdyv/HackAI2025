import { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import useXPSystem from './useXPSystem';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type BalloonData = {
  id: number;
  x: number;
  size: number;
  animY: Animated.Value;
  popped: boolean;
};

export default function useBalloonWave() {
  const { addXP, calculateXP } = useXPSystem(); // ✅ moved inside function

  const [wave, setWave] = useState(1);
  const [balloons, setBalloons] = useState<BalloonData[]>(generateWave(1));

  function generateWave(waveNumber: number): BalloonData[] {
    const count = 5 + waveNumber * 3;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * (SCREEN_WIDTH - 60),
      size: 40 + Math.random() * 30,
      animY: new Animated.Value(0),
      popped: false,
    }));
  }

  const popBalloon = (id: number) => {
    const updated = balloons.map(b =>
      b.id === id ? { ...b, popped: true } : b
    );
    setBalloons(updated);

    if (updated.every(b => b.popped)) {
      const xp = calculateXP(wave);
      addXP(xp);

      setTimeout(() => {
        const nextWave = wave + 1;
        setWave(nextWave);
        setBalloons(generateWave(nextWave));
      }, 1000);
    }
  };

  return { wave, balloons, popBalloon };
}
