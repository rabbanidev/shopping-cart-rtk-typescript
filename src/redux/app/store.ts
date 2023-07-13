import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/cart/cartSlice';
import productsReducer from '../feature/products/productsSlice';
import apiSlice from '../api/apiSlice';
import userReducer from '../feature/user/userSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
