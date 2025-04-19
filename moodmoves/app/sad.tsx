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

const SAPLING_API_KEY = "UDB695DPL5QX15XPDFSIA5FC7SP7H9WM"; // your private key

const analyzeTone = async (text: string): Promise<string | null> => {
  try {
    const response = await fetch("https://api.sapling.ai/api/v1/tone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: SAPLING_API_KEY,
        text,
      }),
    });

    const data = await response.json();

    if (!data?.overall || !Array.isArray(data.overall) || data.overall.length === 0) {
      console.warn("Tone analysis returned no results:", data);
      return null;
    }

    const topTone = data.overall[0][1];
    return topTone;
  } catch (error) {
    console.error("Tone analysis failed:", error);
    return null;
  }
};

export default function SadScreen() {
  const router = useRouter();
  const [journalText, setJournalText] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [entries, setEntries] = useState<
    { prompt: string; text: string; date: string; suggestionPath?: string }[]
  >([]);
  const [toneSuggestion, setToneSuggestion] = useState<string | null>(null);

  const toneToPathMap: Record<string, string> = {
    angry: '/anger',
    annoyed: '/anger',
    fearful: '/anxiety',
    worried: '/anxiety',
    confused: '/anxiety',
  };

  const readablePathMap: Record<string, string> = {
    '/anger': 'Anger Page',
    '/anxiety': 'Anxiety Page',
  };

  const handleSubmit = async () => {
    if (journalText.trim() === '') {
      Alert.alert('Oops!', 'Please write something in your journal before submitting.');
      return;
    }

    const topTone = await analyzeTone(journalText);
    const suggestionPath = topTone && toneToPathMap[topTone] ? toneToPathMap[topTone] : null;

    const date = new Date().toLocaleString();
    setEntries([
      { prompt: currentPrompt, text: journalText.trim(), date, suggestionPath },
      ...entries,
    ]);

    if (suggestionPath) {
      setToneSuggestion(`Based on your entry, you might find the ${readablePathMap[suggestionPath]} helpful.`);
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
            {item.suggestionPath && (
              <TouchableOpacity
                style={styles.suggestionButton}
                onPress={() => router.push(item.suggestionPath)}
              >
                <Text style={styles.suggestionButtonText}>
                  Go to {readablePathMap[item.suggestionPath]}
                </Text>
              </TouchableOpacity>
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
  suggestionButton: {
    marginTop: 10,
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
