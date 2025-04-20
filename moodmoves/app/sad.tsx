import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';

const prompts = [
  "What's one thing you're grateful for today?",
  "Describe a peaceful memory.",
  "What’s something kind you did recently?",
  "How are you feeling right now?",
  "What’s something small that made you smile today?",
  "What would you tell your past self?",
  "What's something you can do for yourself tomorrow?",
];

const getRandomPrompt = (currentPrompt: string) => {
  let newPrompt = currentPrompt;
  while (newPrompt === currentPrompt && prompts.length > 1) {
    newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  }
  return newPrompt;
};

const anxietyKeywords = [
  'worried', 'nervous', 'scared', 'afraid', 'anxious', 'panicking', 'uncertain', 'overwhelmed',
  'insecure', 'stressed', 'restless', 'uneasy', 'concerned', 'apprehensive', 'dread', 'tense',
  'helpless', 'uncomfortable', 'dizzy',
];

const angerKeywords = [
  'pissed', 'annoyed', 'frustrated', 'mad', 'furious', 'upset', 'livid', 'raging', 'bitter',
  'irritated', 'hate', 'angry', 'exploding', 'offended', 'resentful', 'snapped', 'enraged',
  'disrespected', 'ignored', 'taken for granted',
];

export default function SadScreen() {
  const router = useRouter();
  const [journalText, setJournalText] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [entries, setEntries] = useState<{
    prompt: string;
    text: string;
    date: string;
    suggestionPaths?: string[];
  }[]>([]);
  const [toneSuggestion, setToneSuggestion] = useState<string | null>(null);

  const toneToPathMap: Record<string, string> = {
    anger: '/anger',
    anxiety: '/anxiety',
  };

  const readablePathMap: Record<string, string> = {
    '/anger': 'Anger Page',
    '/anxiety': 'Anxiety Page',
  };

  const detectTone = (text: string): string[] => {
    const lowerText = text.toLowerCase();
    const detectedTones: string[] = [];

    const containsAnxiety = anxietyKeywords.some(word => lowerText.includes(word));
    const containsAnger = angerKeywords.some(word => lowerText.includes(word));

    if (containsAnger) detectedTones.push('anger');
    if (containsAnxiety) detectedTones.push('anxiety');

    return detectedTones;
  };

  const handleSubmit = () => {
    if (journalText.trim() === '') {
      Alert.alert('Oops!', 'Please write something in your journal before submitting.');
      return;
    }

    const detectedTones = detectTone(journalText);
    const suggestionPaths = detectedTones.map(tone => toneToPathMap[tone]);

    const date = new Date().toLocaleString();
    const newEntry = {
      prompt: currentPrompt,
      text: journalText.trim(),
      date,
      suggestionPaths,
    };

    setEntries([newEntry, ...entries]);

    if (suggestionPaths.length > 0) {
      const toneSuggestions = suggestionPaths.map(
        (path) => `Based on your entry, you might find the ${readablePathMap[path]} helpful.`
      );
      setToneSuggestion(toneSuggestions.join(' '));
    } else {
      setToneSuggestion(null);
    }

    Alert.alert('Thank you for sharing!', 'Your thoughts have been saved. 💖');
    setJournalText('');
  };

  const handleNewPrompt = () => {
    const newPrompt = getRandomPrompt(currentPrompt);
    setCurrentPrompt(newPrompt);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sad</Text>
      <Text style={styles.description}>
        Let's do something calming. ☁️
      </Text>

      <Text style={styles.prompt}>{currentPrompt}</Text>
      <TouchableOpacity onPress={handleNewPrompt} style={styles.newPromptButton}>
        <Text style={styles.newPromptText}>New Prompt</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        placeholder="Write your feelings here..."
        multiline
        value={journalText}
        onChangeText={setJournalText}
      />
      <Button title="Submit Journal" onPress={handleSubmit} color="#457b9d" />

      {toneSuggestion && (
        <Text style={{ fontSize: 16, marginTop: 10, color: '#1d3557', fontStyle: 'italic' }}>
          {toneSuggestion} 💡
        </Text>
      )}

      <Text style={styles.subHeader}>Past Journal Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryPrompt}>Prompt: {item.prompt}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
            {item.suggestionPaths && (
              <View style={styles.suggestionButtons}>
                {item.suggestionPaths.map((path) => (
                  <TouchableOpacity
                    key={path}
                    style={styles.suggestionButton}
                    onPress={() => router.push(path as '/anger/playground' | '/anxiety')}
                  >
                    <Text style={styles.suggestionButtonText}>
                      Go to {readablePathMap[path]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#457b9d',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  prompt: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  newPromptButton: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#bde0fe',
    borderRadius: 8,
  },
  newPromptText: {
    color: '#1d3557',
    fontWeight: '600',
  },
  textInput: {
    width: '100%',
    minHeight: 120,
    borderColor: '#457b9d',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#1d3557',
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  entryPrompt: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  entryText: {
    marginBottom: 5,
  },
  entryDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  suggestionButtons: {
    marginTop: 10,
  },
  suggestionButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#a8dadc',
    borderRadius: 6,
    alignItems: 'center',
  },
  suggestionButtonText: {
    color: '#1d3557',
    fontWeight: '600',
  },
});
