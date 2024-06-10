// src/features/OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithToken } from '../api/apiUtils';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchWithToken('http://192.168.1.205:3000/orders/all', token);
      const text = await response.text();
      console.log('API response text:', text); // Log the raw response text
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          return data.orders; // Ensure to return orders array
        } else {
          return rejectWithValue(data);
        }
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError.message);
        return rejectWithValue(`JSON Parse error: ${jsonError.message}`);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, isPaid, isDelivered }, { getState, rejectWithValue }) => {
    const token = getState().auth.user.token;
    try {
      const response = await fetchWithToken('http://192.168.1.205:3000/orders/updateorder', token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID: orderId, isPaid, isDelivered }),
      });

      const text = await response.text();
      console.log('Update order response text:', text); // Log the response text
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          return { orderId, isPaid, isDelivered };
        } else {
          return rejectWithValue(data);
        }
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError.message);
        return rejectWithValue(`JSON Parse error: ${jsonError.message}`);
      }
    } catch (error) {
      console.error('Failed to update order:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    new: [],
    paid: [],
    delivered: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.new = [];
      state.paid = [];
      state.delivered = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.new = action.payload.filter(order => !order.is_paid && !order.is_delivered);
        state.paid = action.payload.filter(order => order.is_paid && !order.is_delivered);
        state.delivered = action.payload.filter(order => order.is_paid && order.is_delivered);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, isPaid, isDelivered } = action.payload;
        let orderToUpdate;

        if (isPaid && !isDelivered) {
          orderToUpdate = state.new.find(order => order.id === orderId);
          if (orderToUpdate) {
            state.new = state.new.filter(order => order.id !== orderId);
            state.paid.push({ ...orderToUpdate, is_paid: true });
          }
        } else if (isPaid && isDelivered) {
          orderToUpdate = state.paid.find(order => order.id === orderId);
          if (orderToUpdate) {
            state.paid = state.paid.filter(order => order.id !== orderId);
            state.delivered.push({ ...orderToUpdate, is_delivered: true });
          }
        }
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
