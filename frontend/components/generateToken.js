import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const GenerateToken = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleGenerateToken = async () => {
    try {
      const response = await axios.post('http://10.5.223.63:3000/api/generate-token', {
        meter_number: meterNumber,
        amount: parseInt(amount)
        
      });
      Alert.alert('Token Generated', `Token: ${response.data.token}`, [
        {
          text: 'Validate Token',
          onPress: () => history.push('/validate')
        },
        {
          text: 'View Tokens',
          onPress: () => history.push('/view')
        },
        { text: 'OK' }
      ]);
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
      <Text>Amount (Rwf):</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Generate Token" onPress={handleGenerateToken} />
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

export default GenerateToken;
