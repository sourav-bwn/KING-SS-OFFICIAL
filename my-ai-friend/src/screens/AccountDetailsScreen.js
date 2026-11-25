import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AccountDetailsScreen = ({ route }) => {
  // Mock data - in real app, fetch by ID
  const account = {
    username: 'john_doe_01',
    password: 'securePassword123!',
    email: 'user@example.com',
    creationDate: '2023-10-27 10:00 AM',
    bio: 'Just a bot living in a digital world.',
    profilePic: 'https://via.placeholder.com/150',
    status: 'Active'
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{account.username}</Text>

        <Text style={styles.label}>Password</Text>
        <Text style={styles.value}>{account.password}</Text>

        <Text style={styles.label}>Associated Email</Text>
        <Text style={styles.value}>{account.email}</Text>

        <Text style={styles.label}>Creation Date</Text>
        <Text style={styles.value}>{account.creationDate}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, { color: '#00ff00' }]}>{account.status}</Text>
      </View>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Log into Instagram</Text>
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
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00f2ff',
  },
  actionButtonText: {
    color: '#00f2ff',
    fontWeight: 'bold',
  },
});

export default AccountDetailsScreen;
