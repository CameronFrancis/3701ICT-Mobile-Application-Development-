// src/features/AuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithToken } from '../api/apiUtils';
import { fetchOrders } from './OrderSlice';

export const fetchOrdersAfterLogin = createAsyncThunk(
  'auth/fetchOrdersAfterLogin',
  async (user, { dispatch }) => {
    await dispatch(fetchOrders(user.token));
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, user: { ...state.user.user, ...action.payload } };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAfterLogin.fulfilled, (state, action) => {
      // No additional state changes required here
    });
  }
});

export const { setUser, clearUser, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
