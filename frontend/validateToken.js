import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ValidateToken = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [token, setToken] = useState('');

  const handleValidateToken = async () => {
    try {
      const response = await axios.post('http://10.5.223.63:3000/api/validateToken', {
        meter_number: meterNumber,
        token: token
      });
      Alert.alert(
        'Token Valid',
        `Days: ${response.data.days}\nAmount: ${response.data.amount}\nCreated At: ${response.data.created_at}`,
        [
          {
            text: 'Generate Token',
            onPress: () => history.push('/')
          },
          {
            text: 'View Tokens',
            onPress: () => history.push('/view')
          },
          { text: 'OK' }
        ]
      );
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
      <Text>Token:</Text>
      <TextInput
        style={styles.input}
        value={token}
        onChangeText={setToken}
        keyboardType="numeric"
      />
      <Button title="Validate Token" onPress={handleValidateToken} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ValidateToken;
