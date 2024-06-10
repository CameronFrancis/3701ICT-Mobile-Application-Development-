import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartSlice';
import authReducer from '../features/AuthSlice';
import userReducer from '../features/UserSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
