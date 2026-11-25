import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ProgressBarAndroid, ActivityIndicator, Platform } from 'react-native';

// Mock Data
const MOCK_ACCOUNTS = [
  { id: '1', username: 'john_doe_01', status: 'Created', time: '10:00 AM' },
  { id: '2', username: 'jane_smith_x', status: 'Created', time: '10:02 AM' },
  { id: '3', username: 'cool_user_99', status: 'Verifying', time: 'Now' },
];

const GenerationDashboardScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0.5);
  const [jarvisStatus, setJarvisStatus] = useState('Monitoring account creation...');
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : p + 0.05));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.accountItem}
      onPress={() => navigation.navigate('AccountDetails', { accountId: item.id })}
    >
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'Verifying' ? styles.statusVerifying : styles.statusCreated]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Settings Link */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsText}>⚙️ Settings</Text>
      </TouchableOpacity>

      {/* Jarvis Status Bar */}
      <View style={[styles.jarvisStatus, isCritical && styles.jarvisCritical]}>
        <View style={styles.jarvisHeader}>
          <Text style={styles.jarvisTitle}>Jarvis AI</Text>
          <ActivityIndicator size="small" color="#00f2ff" />
        </View>
        <Text style={styles.jarvisMessage}>{jarvisStatus}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('JarvisLog')}>
          <Text style={styles.logLink}>View Problem Log</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Generation Progress</Text>
        {Platform.OS === 'android' ? (
          <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} color="#00f2ff" />
        ) : (
          <View style={{ height: 4, backgroundColor: '#333', borderRadius: 2 }}>
             <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: '#00f2ff', borderRadius: 2 }} />
          </View>
        )}
        <Text style={styles.progressText}>{Math.round(progress * 100)}% Complete</Text>
      </View>

      {/* Accounts List */}
      <Text style={styles.sectionTitle}>Generated Accounts</Text>
      <FlatList
        data={MOCK_ACCOUNTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  jarvisStatus: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#00f2ff',
  },
  jarvisCritical: {
    borderLeftColor: '#ff0055',
  },
  jarvisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jarvisTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  jarvisMessage: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  logLink: {
    color: '#00f2ff',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 5,
  },
  settingsText: {
    color: '#888',
    fontSize: 16,
  },
  progressSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressText: {
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  statusCreated: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
  statusVerifying: {
    backgroundColor: 'rgba(255, 200, 0, 0.2)',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default GenerationDashboardScreen;
