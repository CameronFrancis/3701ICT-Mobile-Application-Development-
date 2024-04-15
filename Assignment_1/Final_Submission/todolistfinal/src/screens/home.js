import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadTodos = async () => {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) setTodos(JSON.parse(storedTodos));
      };

      loadTodos();
    }, [])
  );

  const toggleTodo = async (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, expanded: !todo.expanded };
      }
      return todo;
    });
    setTodos(newTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const markAsFinished = async (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, finished: true };
      }
      return todo;
    });
    setTodos(newTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = async (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleTodo(item.id)} style={styles.todoItem}>
            <Text style={{ color: item.expanded ? 'black' : 'grey' }}>{item.title}</Text>
            {item.expanded && (
              <View>
                <Text>{item.description}</Text>
                {!item.finished && (
                  <Pressable onPress={() => markAsFinished(item.id)}>
                    <Icon name="checkmark-circle-outline" size={24} color="green" />
                  </Pressable>
                )}
                <Pressable onPress={() => deleteTodo(item.id)}>
                  <Icon name="trash-bin-outline" size={24} color="red" />
                </Pressable>
              </View>
            )}
          </Pressable>
        )}
      />
      <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddTodo')}>
        <Icon name="add-circle-outline" size={24} color="black" />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      width: '100%',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      alignItems: 'center',
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    todoListContainer: {
      flex: 1,
      width: '100%',
    },
    todoItem: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginLeft: '5%',
      marginRight: '5%',
      textAlign: 'center',
      color: 'black',
      width: '90%',
    },
    addButton: {
      backgroundColor: 'lightblue', 
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',  
      justifyContent: 'center',  
      flexDirection: 'row',  
      width: '90%',  
      alignSelf: 'center', 
      marginBottom: 20,
    },
    addButtonText: {
      fontSize: 18,
      marginLeft: 10,  
    },
    icon: {
      color: 'black',
    }
  });
  
  export default HomeScreen;
  
