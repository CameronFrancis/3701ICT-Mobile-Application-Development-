import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateCart, checkoutCart } from '../features/CartSlice';

const ShoppingCartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await dispatch(checkoutCart());
      Alert.alert('Success', 'Checkout successful');
    } catch (error) {
      Alert.alert('Error', 'Failed to checkout');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantity}>
          <Button title="-" onPress={() => dispatch(updateCart({ id: item.id, quantity: item.quantity - 1 }))} />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Button title="+" onPress={() => dispatch(updateCart({ id: item.id, quantity: item.quantity + 1 }))} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {cart.items.length === 0 ? (
            <Text style={styles.empty}>Your Cart is Empty</Text>
          ) : (
            <>
              <FlatList
                data={cart.items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
              <Text style={styles.total}>Total: ${cart.total.toFixed(2)}</Text>
              <Button title="Checkout" onPress={handleCheckout} />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ShoppingCartScreen;
