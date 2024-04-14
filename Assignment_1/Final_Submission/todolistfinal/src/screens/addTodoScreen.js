import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTodoScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveTodo = async () => {
    if (title.trim() === '' || description.trim() === '') {
      alert('Both fields are required.');
      return;
    }

    const newTodo = { id: Date.now(), title, description, expanded: false };
    const storedTodos = await AsyncStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    todos.push(newTodo);
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    setTitle('');
    setDescription('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter Todo Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Pressable style={styles.button} onPress={saveTodo}>
        <Icon name="save-outline" size={24} color="black" />
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    label: {
      fontSize: 18,
      color: '#333',
      marginBottom: 5,
    },
    input: {
      width: '100%',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    descriptionInput: {
      height: 100,
      textAlignVertical: 'top',  
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'black',
      marginLeft: 10,
    },
    icon: {
      color: 'black',
    }
  });
  
  export default AddTodoScreen;