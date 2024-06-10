// src/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        // Store the token and navigate to Profile
      } else {
        Alert.alert('Error', 'Wrong email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your email and password</Text>
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
        <Button title="Clear" onPress={() => { setEmail(''); setPassword(''); }} />
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <Text style={styles.switchText} onPress={() => navigation.navigate('SignUp')}>Switch to: sign up</Text>
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

export default SignInScreen;