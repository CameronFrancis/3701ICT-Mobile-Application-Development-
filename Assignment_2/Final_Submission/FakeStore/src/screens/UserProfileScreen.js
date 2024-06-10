import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../features/AuthSlice';

const UserProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!user) {
      navigation.navigate('SignIn');
    } else {
      console.log('User found:', user); // Logging the user object
      setName(user.user.name);
    }
  }, [user]);

  const handleUpdate = async () => {
    console.log('Updating user with:', { name, password }); // Log update details
    try {
      const response = await fetch('http://192.168.1.205:3000/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      console.log('Update response:', data); // Log the response

      if (response.ok) {
        dispatch(updateUser({ name }));
        Alert.alert('Success', 'User details updated successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to update user details');
      }
    } catch (error) {
      console.error('Failed to update user details:', error);
      Alert.alert('Error', 'Failed to update user details');
    }
  };

  const handleLogout = () => {
    console.log('Logging out'); // Log logout action
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  if (!user) {
    return null; // or a loading spinner, or redirect to sign in
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.label}>Email: {user.user.email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default UserProfileScreen;
