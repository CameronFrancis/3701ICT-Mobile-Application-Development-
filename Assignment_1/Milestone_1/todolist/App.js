import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <Text style={styles.todoItem}>Todo Item 1</Text>
      <Text style={styles.todoItem}>Todo Item 2</Text>
      <Button title="Add New Todo" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  todoItem: {
    marginTop: 10,
  },

});
