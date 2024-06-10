import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/CartSlice';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
    navigation.navigate('ShoppingCart');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Error: Product data is unavailable.</Text>
        <Button title="Back to Products" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title || 'No title'}</Text>
        <Text style={styles.price}>${product.price ? product.price.toFixed(2) : '0.00'}</Text>
        <Text style={styles.description}>{product.description || 'No description available'}</Text>
        <Button title="Add to Shopping Cart" onPress={addToCartHandler} />
      </View>
      <Button title="Back to Products" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailContainer: {
    alignItems: 'center',
    maxWidth: 350,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default ProductDetailScreen;
