import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

const ManageMobileNumbersScreen = () => {
  const [numbers, setNumbers] = useState([
    { id: '1', number: '+1 555 0101', status: 'Active' },
    { id: '2', number: '+1 555 0102', status: 'Used' },
  ]);
  const [newNumber, setNewNumber] = useState('');

  const addNumber = () => {
    if (newNumber) {
      setNumbers([...numbers, { id: Date.now().toString(), number: newNumber, status: 'Active' }]);
      setNewNumber('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.numberText}>{item.number}</Text>
      <Text style={styles.statusText}>{item.status}</Text>
      <TouchableOpacity onPress={() => setNumbers(numbers.filter(n => n.id !== item.id))}>
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Mobile Numbers</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="+1 234 ..."
          placeholderTextColor="#666"
          value={newNumber}
          onChangeText={setNewNumber}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNumber}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#00f2ff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  addButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  numberText: {
    color: '#fff',
    fontSize: 16,
  },
  statusText: {
    color: '#888',
    fontSize: 14,
  },
  deleteText: {
    color: '#ff4444',
  },
});

export default ManageMobileNumbersScreen;
