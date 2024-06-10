import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../features/CartSlice';
import { fetchOrders } from '../features/OrderSlice';

const ShoppingCartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const user = useSelector(state => state.auth.user);

  const handleCreateOrder = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create an order');
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        prodID: item.id,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch('http://192.168.1.205:3000/orders/neworder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ items: orderItems }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Order created successfully');
        dispatch(clearCart());
        dispatch(fetchOrders(user.token)); // Refetch orders after creating a new one
        navigation.navigate('MyOrders'); // Navigate to the My Orders screen
      } else {
        Alert.alert('Error', data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      Alert.alert('Error', 'Failed to create order');
    }
  };

  const renderItem = ({ item }) => {
    const { id, title, price, quantity, image } = item;
    const subtotal = price !== undefined ? (price * quantity).toFixed(2) : 'N/A';

    return (
      <View style={styles.item}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>Price: ${price !== undefined ? price.toFixed(2) : 'N/A'}</Text>
          <Text style={styles.quantity}>Quantity: {quantity}</Text>
          <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => dispatch(increaseQuantity(id))} style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(decreaseQuantity(id))} style={styles.actionButton}>
            <Ionicons name="remove-circle" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(removeItemFromCart(id))} style={styles.actionButton}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {totalQuantity === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Total Items: {totalQuantity}</Text>
            <Text style={styles.summaryText}>Total Price: ${totalPrice.toFixed(2)}</Text>
            <Button title="Create Order" onPress={handleCreateOrder} />
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    marginBottom: 5,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    marginVertical: 2,
  },
  summary: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});

export default ShoppingCartScreen;
