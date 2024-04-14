import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
      </View>
      <View style={styles.todoListContainer}>
        <Text style={styles.todoItem}>Buy Milk</Text>
        <Text style={styles.todoItem}>Buy Eggs</Text>
        <Text style={styles.todoItem}>Buy Bread</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTodo')}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
          <Text style={styles.addButtonText}>Add New Todo</Text>
        </TouchableOpacity>
      </View>
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
  footer: {
    width: '100%',
    padding: 10,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 18,
  }
});

export default HomeScreen;
