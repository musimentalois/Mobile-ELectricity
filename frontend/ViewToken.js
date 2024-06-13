import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const ViewToken = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [tokens, setTokens] = useState([]);

  const handleViewToken = async () => {
    try {
      const response = await axios.get(`http://10.5.223.63:3000/api/tokens/${meterNumber}`);
      setTokens(response.data);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Meter Number:</Text>
      <TextInput
        style={styles.input}
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
      />
      <Button title="View Tokens" onPress={handleViewToken} />
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.token}
        renderItem={({ item }) => (
          <View style={styles.tokenItem}>
            <Text>Token: {item.token}</Text>
            <Text>Days: {item.days}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Created At: {item.created_at}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  tokenItem: {
    padding: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default ViewToken;
