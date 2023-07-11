import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/cart/cartSlice';
import productsReducer from '../feature/products/productsSlice';
import apiSlice from '../api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
