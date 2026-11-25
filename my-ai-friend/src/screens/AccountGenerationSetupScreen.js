import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';

const AccountGenerationSetupScreen = ({ navigation }) => {
  const [method, setMethod] = useState('gmail'); // 'gmail' or 'mobile'
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [autoReadOTP, setAutoReadOTP] = useState(true);

  const handleStartGeneration = () => {
    if ((method === 'gmail' && !email) || (method === 'mobile' && !mobile) || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // In a real app, this would start the backend process
    // Navigate directly for smoother UX and better testing compatibility
    console.log('Starting account generation...');
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Generation Setup</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, method === 'gmail' && styles.activeToggle]}
          onPress={() => setMethod('gmail')}
        >
          <Text style={[styles.toggleText, method === 'gmail' && styles.activeToggleText]}>Gmail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, method === 'mobile' && styles.activeToggle]}
          onPress={() => setMethod('mobile')}
        >
          <Text style={[styles.toggleText, method === 'mobile' && styles.activeToggleText]}>Mobile</Text>
        </TouchableOpacity>
      </View>

      {method === 'gmail' ? (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gmail Address</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      ) : (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 234 567 8900"
            placeholderTextColor="#666"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
          <TouchableOpacity onPress={() => navigation.navigate('ManageMobile')}>
            <Text style={styles.linkText}>Manage Mobile Numbers</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Common Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password for new accounts"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Auto-Read OTP</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00f2ff" }}
          thumbColor={autoReadOTP ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={setAutoReadOTP}
          value={autoReadOTP}
        />
      </View>
      <Text style={styles.helperText}>
        Jarvis will automatically read OTPs from your {method === 'gmail' ? 'Gmail' : 'SMS'}.
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStartGeneration}>
        <Text style={styles.startButtonText}>Start Generation</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 20,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#00f2ff',
  },
  toggleText: {
    color: '#888',
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#121212',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#e0e0e0',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  linkText: {
    color: '#00f2ff',
    marginTop: 5,
    textAlign: 'right',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    color: '#e0e0e0',
    fontSize: 16,
  },
  helperText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#00f2ff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#00f2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AccountGenerationSetupScreen;
