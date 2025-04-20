import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DriftwoodJournal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driftwood Journal 🪵</Text>
      <Text style={styles.message}>This mode is coming soon.</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back to Beach</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d4f1f9', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1d3557' },
  message: { marginTop: 12, fontSize: 16, color: '#457b9d' },
  back: { marginTop: 24, fontSize: 16, color: '#1d3557' },
});
