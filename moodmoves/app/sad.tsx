import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function SadScreen() {
  const [journalText, setJournalText] = useState('');

  // Handle text change in journaling input
  const handleTextChange = (text: string) => {
    setJournalText(text);
  };

  // Handle the submit action
  const handleSubmit = () => {
    if (journalText.trim() === '') {
      Alert.alert('Oops!', 'Please write something in your journal before submitting.');
    } else {
      Alert.alert('Thank you for sharing!', 'Your thoughts have been saved. 💖');
      setJournalText(''); // Clear the journal input after submission
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sad</Text>
      <Text style={styles.description}>
        Let's do something calming. ☁️
        {'\n\n'}(Soothing animation or journaling game coming soon!)
      </Text>

      {/* Journaling Section */}
      <TextInput
        style={styles.textInput}
        placeholder="Write your feelings here..."
        multiline
        value={journalText}
        onChangeText={handleTextChange}
      />
      <Button title="Submit Journal" onPress={handleSubmit} color="#457b9d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#457b9d',
  },
  description: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  textInput: {
    width: '80%',
    height: 150,
    borderColor: '#457b9d',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    fontSize: 18,
    textAlignVertical: 'top', // To align the text to the top
  },
});
