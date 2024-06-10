// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // This will hold array of cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add or increase the quantity of a product in the cart
    addToCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        // If item exists, just increment the quantity
        state.items[existingIndex].quantity += 1;
      } else {
        // Otherwise, add new item with quantity 1
        const newItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
      }
    },
    // Action to remove or decrease the quantity of a product in the cart
    removeFromCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0 && state.items[existingIndex].quantity > 1) {
        // If more than one, reduce quantity
        state.items[existingIndex].quantity -= 1;
      } else {
        // If exactly one, remove item from cart
        state.items.splice(existingIndex, 1);
      }
    },
    // Action to clear the cart completely
    clearCart: (state) => {
      state.items = [];
    }
  },
});

// Export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
