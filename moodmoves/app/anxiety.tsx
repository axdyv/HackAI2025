import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';

const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const generatePuzzle = () => {
  const puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents the empty space
  return shuffleArray(puzzle);
};

export default function AnxietyScreen() {
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [solved, setSolved] = useState(false);

  // Function to handle tile movement
  const moveTile = (index: number) => {
    const newPuzzle = [...puzzle];
    const emptyIndex = newPuzzle.indexOf(0);
    const validMoves = [
      emptyIndex - 3, // Up
      emptyIndex + 3, // Down
      emptyIndex - 1, // Left
      emptyIndex + 1, // Right
    ];
    
    if (validMoves.includes(index) && Math.abs(index - emptyIndex) !== 3) {
      newPuzzle[emptyIndex] = newPuzzle[index];
      newPuzzle[index] = 0;
      setPuzzle(newPuzzle);
    }
  };

  // Check if puzzle is solved
  const checkSolved = () => {
    const solvedPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    if (JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle)) {
      setSolved(true);
      Alert.alert("Well Done!", "You've solved the puzzle! 🎉");
    }
  };

  const renderTile = (value: number, index: number) => {
    if (value === 0) return <View style={styles.tileEmpty} />;
    return (
      <TouchableOpacity
        key={index}
        style={styles.tile}
        onPress={() => moveTile(index)}
      >
        <Text style={styles.tileText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anxiety</Text>
      <Text style={styles.description}>
        Focus your mind with a calming puzzle maze. 🔍
        {'\n\n'}(Mini-game coming soon!)
      </Text>
      
      {/* Puzzle Grid */}
      <View style={styles.grid}>
        {puzzle.map((value, index) => renderTile(value, index))}
      </View>
      
      <Button title="Check if Solved" onPress={checkSolved} color="#2a9d8f" />
      
      {/* If solved, show a congratulations message */}
      {solved && <Text style={styles.congratulations}>Great job! You've solved the puzzle!</Text>}
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
    marginTop: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginTop: 30,
  },
  tile: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center', // Added missing style property
    alignItems: 'center', // Added missing style property
  },
  tileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tileEmpty: {
    width: 90,
    height: 90,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 5,
  },
  congratulations: {
    fontSize: 18,
    marginTop: 20,
    color: '#2a9d8f',
  },
});
