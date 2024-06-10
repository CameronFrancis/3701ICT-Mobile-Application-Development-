// src/features/OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (token) => {
  const response = await fetch('http://192.168.1.205:3000/orders/all', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('Fetched Orders:', data.orders); // Log fetched orders
  return data.orders;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    new: [],
    paid: [],
    delivered: [],
  },
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderId, isPaid, isDelivered } = action.payload;
      for (const status in state) {
        const index = state[status].findIndex(order => order.id === orderId);
        if (index !== -1) {
          const updatedOrder = { ...state[status][index] };
          if (isPaid !== undefined) updatedOrder.is_paid = isPaid;
          if (isDelivered !== undefined) updatedOrder.is_delivered = isDelivered;

          state[status].splice(index, 1);

          if (updatedOrder.is_delivered) {
            state.delivered.push(updatedOrder);
          } else if (updatedOrder.is_paid) {
            state.paid.push(updatedOrder);
          } else {
            state.new.push(updatedOrder);
          }

          break;
        }
      }
      console.log('Updated Order Status:', state); // Log state after updating order status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      console.log('Orders fetched successfully:', action.payload);
      state.new = action.payload.filter(order => !order.is_paid);
      state.paid = action.payload.filter(order => order.is_paid && !order.is_delivered);
      state.delivered = action.payload.filter(order => order.is_delivered);
      console.log('Orders categorized:', state); // Log categorized orders
    });
    builder.addCase(fetchOrders.pending, () => {
      console.log('Fetching orders...');
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      console.error('Failed to fetch orders:', action.error.message);
    });
  },
});

export const { updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
