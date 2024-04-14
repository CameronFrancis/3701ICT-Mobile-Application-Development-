import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  

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
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTodo')}>
        <Icon name="add-circle-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
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
