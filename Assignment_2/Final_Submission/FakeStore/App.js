// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import store from './src/store/store';
import { useSelector } from 'react-redux'; // Ensure this is only imported once

// Importing screens
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Products Navigator
function ProductsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen name="Products" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MyTabs() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ProductsNavigator') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ShoppingCart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'UserProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="ProductsNavigator" 
        component={ProductsNavigator} 
        options={{ headerShown: false, title: 'Products' }} 
      />
      <Tab.Screen 
        name="ShoppingCart" 
        component={ShoppingCartScreen} 
        options={{ tabBarBadge: totalQuantity }} 
      />
      <Tab.Screen 
        name="UserProfile" 
        component={UserProfileScreen} 
      />
    </Tab.Navigator>
  );
}

// App Component
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Main" 
            component={MyTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen} 
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
