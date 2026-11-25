import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  // Jarvis Settings
  const [jarvisEnabled, setJarvisEnabled] = useState(true);
  const [autoActivate, setAutoActivate] = useState(true);
  const [edgeLighting, setEdgeLighting] = useState(true);

  // Photo Posting Settings
  const [autoPost, setAutoPost] = useState(false);
  const [postFreq, setPostFreq] = useState('Daily');

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Jarvis Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Jarvis AI</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Enable Jarvis AI</Text>
          <Switch value={jarvisEnabled} onValueChange={setJarvisEnabled} trackColor={{true: '#00f2ff'}} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Auto-Activate on Launch</Text>
          <Switch value={autoActivate} onValueChange={setAutoActivate} trackColor={{true: '#00f2ff'}} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Edge Lighting Feedback</Text>
          <Switch value={edgeLighting} onValueChange={setEdgeLighting} trackColor={{true: '#00f2ff'}} />
        </View>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('EdgeLightingPreview')}
        >
          <Text style={styles.linkText}>Customize Edge Lighting &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Automation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Automation</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Auto-Post Random Photos</Text>
          <Switch value={autoPost} onValueChange={setAutoPost} trackColor={{true: '#00f2ff'}} />
        </View>

        {autoPost && (
          <View style={styles.subOption}>
            <Text style={styles.subLabel}>Frequency: {postFreq}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('TargetAutomation')}
        >
          <Text style={styles.linkText}>Target Account Automation &gt;</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 20,
  },
  sectionHeader: {
    color: '#00f2ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  subOption: {
    marginLeft: 20,
    marginBottom: 20,
  },
  subLabel: {
    color: '#aaa',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#00f2ff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
