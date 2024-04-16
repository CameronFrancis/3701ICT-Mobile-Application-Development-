import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

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
        <Button title="Add New Todo" onPress={() => navigation.navigate('AddTodo')} />
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
});

export default HomeScreen;
