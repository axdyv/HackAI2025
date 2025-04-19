import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function AngerScreen() {
  const [balloons, setBalloons] = useState(5); // Starting with 5 balloons

  // Function to pop a balloon
  const popBalloon = () => {
    if (balloons > 0) {
      setBalloons(balloons - 1); // Decrease the number of balloons
      if (balloons === 1) {
        Alert.alert("Congratulations!", "You've popped all the balloons! 🎉");
      }
    } else {
      Alert.alert("No more balloons", "You have popped all the balloons. Great job!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anger</Text>
      <Text style={styles.description}>
        Pop the balloons to release some steam! 🎈
        {'\n\n'}(Game coming soon!)
      </Text>
      
      <Text style={styles.balloonsText}>
        Balloons remaining: {balloons}
      </Text>

      <Button title="Pop a Balloon!" onPress={popBalloon} color="#e63946" />
      
      {/* Display the number of remaining balloons */}
      {balloons === 0 && (
        <Text style={styles.congratulations}>Great job! You’ve popped all the balloons!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd5ce',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e63946',
  },
  description: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  balloonsText: {
    fontSize: 20,
    marginTop: 20,
    color: '#e63946',
    fontWeight: 'bold',
  },
  congratulations: {
    fontSize: 18,
    marginTop: 20,
    color: '#2a9d8f',
    fontWeight: 'bold',
  },
});
