import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';

const TargetAccountAutomationScreen = ({ navigation }) => {
  const [targetUsername, setTargetUsername] = useState('');
  const [autoFollow, setAutoFollow] = useState(false);
  const [autoLike, setAutoLike] = useState(false);
  const [autoComment, setAutoComment] = useState(false);
  const [autoReport, setAutoReport] = useState(false);
  const [autoShare, setAutoShare] = useState(false);

  const handleStart = () => {
    if (!targetUsername) {
      Alert.alert('Error', 'Please enter a target username.');
      return;
    }
    Alert.alert('Automation Started', `Targeting @${targetUsername} with selected actions.`);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Target Automation</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Target Username</Text>
        <TextInput
          style={styles.input}
          placeholder="@username"
          placeholderTextColor="#666"
          value={targetUsername}
          onChangeText={setTargetUsername}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>

        <View style={styles.row}>
          <Text style={styles.rowText}>Auto-Follow</Text>
          <Switch value={autoFollow} onValueChange={setAutoFollow} trackColor={{true: '#00f2ff'}} />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Auto-Like Posts</Text>
          <Switch value={autoLike} onValueChange={setAutoLike} trackColor={{true: '#00f2ff'}} />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Auto-Comment</Text>
          <Switch value={autoComment} onValueChange={setAutoComment} trackColor={{true: '#00f2ff'}} />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Auto-Share</Text>
          <Switch value={autoShare} onValueChange={setAutoShare} trackColor={{true: '#00f2ff'}} />
        </View>

        <View style={styles.row}>
          <Text style={[styles.rowText, { color: '#ff4444' }]}>Auto-Report (Use with caution)</Text>
          <Switch value={autoReport} onValueChange={setAutoReport} trackColor={{true: '#ff4444'}} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start Automation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    color: '#aaa',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#333',
  },
  section: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#00f2ff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  rowText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00f2ff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TargetAccountAutomationScreen;
