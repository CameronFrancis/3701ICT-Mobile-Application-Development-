// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // items will be objects with {id, title, price, quantity, image}
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        const item = { ...action.payload, quantity: 1 };
        state.items.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload);
      if (state.items[existingIndex].quantity > 1) {
        state.items[existingIndex].quantity -= 1;
      } else {
        state.items.splice(existingIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
