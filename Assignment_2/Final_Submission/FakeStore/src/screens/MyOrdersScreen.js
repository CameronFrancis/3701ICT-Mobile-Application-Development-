import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchOrders, updateOrderStatus } from '../features/OrderSlice';

const MyOrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const orders = useSelector(state => state.orders);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]); // Ensure this is an array

  useEffect(() => {
    console.log('User in MyOrdersScreen:', user);
    if (user) {
      dispatch(fetchOrders(user.token));
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log('Orders state:', orders);
  }, [orders]);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderIds(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
    console.log('Toggled expansion:', expandedOrderIds);
  };

  const handleUpdateOrder = async (orderId, isPaid, isDelivered) => {
    try {
      const response = await fetch('http://192.168.1.205:3000/orders/updateorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ orderID: orderId, isPaid, isDelivered }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateOrderStatus({ orderId, isPaid, isDelivered }));
        Alert.alert('Success', `Order ${isPaid ? 'paid' : 'delivered'} successfully`);
      } else {
        Alert.alert('Error', data.message || 'Failed to update order');
      }
    } catch (error) {
      console.error('Failed to update order:', error);
      Alert.alert('Error', 'Failed to update order');
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <TouchableOpacity onPress={() => handleToggleExpand(item.id)}>
        <Text>Order ID: {item.id}</Text>
        <Text>Items: {item.item_numbers}</Text>
        <Text>Total: ${item.total_price.toFixed(2)}</Text>
        <Ionicons
          name={expandedOrderIds.includes(item.id) ? 'caret-up' : 'caret-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expandedOrderIds.includes(item.id) && (
        <>
          <FlatList
            data={JSON.parse(item.order_items)}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text>{item.title} x{item.quantity}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {!item.is_paid && (
            <Button title="Pay" onPress={() => handleUpdateOrder(item.id, true, item.is_delivered)} />
          )}
          {item.is_paid && !item.is_delivered && (
            <Button title="Receive" onPress={() => handleUpdateOrder(item.id, item.is_paid, true)} />
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {['new', 'paid', 'delivered'].map(status => (
        <View key={status}>
          <TouchableOpacity style={styles.header} onPress={() => handleToggleExpand(status)}>
            <Text style={styles.headerText}>{status.charAt(0).toUpperCase() + status.slice(1)} Orders ({orders[status]?.length ?? 0})</Text>
            <Ionicons name={expandedOrderIds.includes(status) ? 'caret-up' : 'caret-down'} size={24} color="black" />
          </TouchableOpacity>
          {expandedOrderIds.includes(status) && (
            <FlatList
              data={orders[status]}
              renderItem={renderOrderItem}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default MyOrdersScreen;
