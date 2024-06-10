import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchOrders, updateOrderStatus } from '../features/OrderSlice';

const MyOrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const orders = useSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders(user.token));
    }
  }, [dispatch, user]);

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

      const text = await response.text();
      console.log('Update order response text:', text); // Log the response text
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          dispatch(updateOrderStatus({ orderId, isPaid, isDelivered }));
          Alert.alert('Success', `Order ${isPaid ? 'paid' : 'delivered'} successfully`);
          dispatch(fetchOrders(user.token)); // Refetch orders after updating
          setSelectedOrder(null); // Close modal after update
        } else {
          Alert.alert('Error', data.message || 'Failed to update order');
        }
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError.message);
        Alert.alert('Error', `JSON parse error: ${jsonError.message}`);
      }
    } catch (error) {
      console.error('Failed to update order:', error.message);
      Alert.alert('Error', 'Failed to update order');
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => setSelectedOrder(item)}>
      <Text>Order ID: {item.id}</Text>
      <Text>Items: {item.item_numbers}</Text>
      <Text>Total: ${(item.total_price / 100).toFixed(2)}</Text>
      <Ionicons name="caret-forward" size={24} color="black" />
    </TouchableOpacity>
  );

  const renderModalContent = () => {
    if (!selectedOrder) return null;

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Order ID: {selectedOrder.id}</Text>
        {!selectedOrder.is_paid && (
          <Button title="Pay" onPress={() => handleUpdateOrder(selectedOrder.id, true, selectedOrder.is_delivered)} />
        )}
        {selectedOrder.is_paid && !selectedOrder.is_delivered && (
          <Button title="Receive" onPress={() => handleUpdateOrder(selectedOrder.id, selectedOrder.is_paid, true)} />
        )}
        <Button title="Close" onPress={() => setSelectedOrder(null)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {['new', 'paid', 'delivered'].map(category => (
        <View key={category}>
          <Text style={styles.headerText}>{category.charAt(0).toUpperCase() + category.slice(1)} Orders</Text>
          <FlatList
            data={orders[category]}
            renderItem={renderOrderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ))}
      <Modal visible={!!selectedOrder} animationType="slide">
        <View style={styles.modalContainer}>
          {renderModalContent()}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MyOrdersScreen;
