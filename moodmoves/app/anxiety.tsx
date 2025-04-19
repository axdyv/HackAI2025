import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Alert,
} from 'react-native';

const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];

export default function AnxietyScreen() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseText, setPhaseText] = useState(phases[0]);
  const [timer, setTimer] = useState(1);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [sessionFinished, setSessionFinished] = useState(false);

  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (sessionFinished) return;

    const isExpand = phaseText === 'Inhale';
    const isShrink = phaseText === 'Exhale';

    Animated.timing(animation, {
      toValue: isExpand ? 1.4 : isShrink ? 0.6 : 1,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();

    setTimer(1);
    let count = 1;

    const interval = setInterval(() => {
      count++;
      setTimer(count);
      if (count === 4) clearInterval(interval);
    }, 1000);

    const timeout = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % phases.length;
      setPhaseIndex(nextIndex);
      setPhaseText(phases[nextIndex]);

      // Track rounds (1 round = 4 phases)
      if (phaseText === 'Hold' && phaseIndex === 3) {
        setRoundsCompleted((prev) => {
          const newCount = prev + 1;
          if (newCount === 3) {
            setSessionFinished(true);
          }
          return newCount;
        });
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phaseIndex, phaseText, sessionFinished]);

  const handleRestartSession = () => {
    setRoundsCompleted(0);
    setSessionFinished(false);
    setPhaseIndex(0);
    setPhaseText(phases[0]);
  };

  const handleFeelBetter = () => {
    Alert.alert("That’s great!", "We’re glad you’re feeling better 💚");
  };

  const handleWriteFeelings = () => {
    Alert.alert("Coming Soon!", "We'll help you journal your thoughts. 📝");
    // If you have a journal screen:
    // navigation.navigate('SadScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anxiety</Text>
      <Text style={styles.description}>
        Let’s calm your mind with some guided breathing. 🌬️
      </Text>

      <Animated.View style={[styles.bubble, { transform: [{ scale: animation }] }]}>
        <View style={styles.highlight} />
        <Text style={styles.timerText}>{timer}</Text>
      </Animated.View>

      {!sessionFinished && (
        <>
          <Text style={styles.phaseText}>{phaseText}</Text>
          <Text style={styles.subText}>Breathe with the bubble</Text>
        </>
      )}

      {sessionFinished && (
        <View style={styles.sessionEnd}>
          <Text style={styles.endMessage}>Great job! 💖</Text>
          <Text style={styles.checkIn}>Are you feeling okay?</Text>

          <TouchableOpacity style={styles.button} onPress={handleFeelBetter}>
            <Text style={styles.buttonText}>Yes, I feel better</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRestartSession}>
            <Text style={styles.buttonText}>No, I need another round</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleWriteFeelings}>
            <Text style={styles.buttonText}>I want to write about my feelings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f3dc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  bubble: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(149, 213, 178, 0.3)',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#b7e4c7',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2a9d8f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  highlight: {
    position: 'absolute',
    top: 25,
    left: 30,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1b4332',
  },
  phaseText: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 40,
    color: '#1b4332',
  },
  subText: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  sessionEnd: {
    marginTop: 40,
    alignItems: 'center',
  },
  endMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 10,
  },
  checkIn: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

