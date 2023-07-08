import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/cart/cartSlice';
import productsReducer from '../feature/products/productsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
