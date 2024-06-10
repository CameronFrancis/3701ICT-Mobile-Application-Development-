// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.token) {
        // Store the token and navigate to Profile
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up a new user</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={() => { setName(''); setEmail(''); setPassword(''); }} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      <Text style={styles.switchText} onPress={() => navigation.navigate('SignIn')}>Switch to: sign in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 18, marginBottom: 16 },
  input: { borderWidth: 1, marginBottom: 16, padding: 8, borderRadius: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  switchText: { marginTop: 16, color: 'blue', textAlign: 'center' },
});

export default SignUpScreen;
