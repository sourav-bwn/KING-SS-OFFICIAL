import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const JarvisProblemLogScreen = () => {
  const logs = [
    { id: '1', time: '10:05 AM', issue: 'OTP Timeout', action: 'Retried fetch, success.' },
    { id: '2', time: '10:07 AM', issue: 'Username Taken', action: 'Appended random digits.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jarvis Problem Log</Text>
      <FlatList
        data={logs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.issue}>Issue: {item.issue}</Text>
            <Text style={styles.action}>Action: {item.action}</Text>
          </View>
        )}
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
  header: {
    color: '#00f2ff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logItem: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#ffaa00',
  },
  time: {
    color: '#666',
    fontSize: 12,
    marginBottom: 5,
  },
  issue: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  action: {
    color: '#ccc',
  },
});

export default JarvisProblemLogScreen;
