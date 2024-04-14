import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home.js';
import AddTodoScreen from './src/screens/addTodoScreen.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: 'Add New Todo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
