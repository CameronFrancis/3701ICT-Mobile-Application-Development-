import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the "Home" navigator and then to the "Products" screen
      navigation.navigate('Home', { screen: 'Products' });
    }, 3000);  // After 3 seconds, navigate to the Products screen

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder for your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Fake Store</Text>
      <Button
        title="Go to Products"
        onPress={() => navigation.navigate('Home', { screen: 'Products' })}
      />
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
