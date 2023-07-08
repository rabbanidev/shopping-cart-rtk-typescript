/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '@/types/globalTypes';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const exiting = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (exiting) {
        exiting.quantity = exiting.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    quantityDecrease: (state, action: PayloadAction<IProduct>) => {
      const exiting = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (exiting && exiting.quantity! > 1) {
        exiting.quantity = exiting.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }

      state.total -= action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, quantityDecrease, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
