import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartSlice';
import authReducer from '../features/AuthSlice';
import userReducer from '../features/UserSlice';
import orderReducer from '../features/OrderSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    orders: orderReducer,
  },
});

export default store;
