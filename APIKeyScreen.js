import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Image } from 'react-native';
import secureStorage from './SecureStore';

const APIKeyScreen = ({ navigation }) => {
  const [apiKey, setApiKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveAPIKey = async () => {
    if (apiKey.length < 500) {
      setErrorMessage('That is likely not a valid API key. Copy yours from the Clarity Web interface');
      return;
    }

    if (apiKey) {
      await secureStorage.saveAPIKey(apiKey);
      navigation.replace('Clarity Go'); // Go to the dashboard screen
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Add the image here */}
      <Image
        source={require('./assets/newicon.png')} // Adjust the path if needed
        style={styles.icon}
      />
      <Text style={styles.header}>Add your Microsoft Clarity API key to get started</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter API Key"
        value={apiKey}
        onChangeText={setApiKey}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Start" onPress={handleSaveAPIKey} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'start', padding: 16, marginTop: '10%' },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
  error: { color: 'red', textAlign: 'center', marginTop: 10 },
  icon: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    alignSelf: 'center',
    marginBottom: 20, // Space between image and text
    borderRadius: 20,
  },
});

export default APIKeyScreen;
