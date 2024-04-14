import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
      </View>
      <ScrollView style={styles.todoListContainer}>
        <Text style={styles.todoItem}>Buy Milk</Text>
        <Text style={styles.todoItem}>Buy Eggs</Text>
        <Text style={styles.todoItem}>Buy Bread</Text>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Add New Todo" onPress={() => {}} />
      </View>
    </View>
  );
}

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