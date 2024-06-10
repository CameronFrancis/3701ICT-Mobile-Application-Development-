import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('SignIn');
      }
    }, 3000);  // After 3 seconds, navigate to the appropriate screen

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation, user]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder for your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Fake Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
