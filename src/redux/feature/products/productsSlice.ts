import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProductFilter {
  status: boolean;
  priceRange: number;
}

const initialState: IProductFilter = {
  status: false,
  priceRange: 200000,
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    statusToggled: (state) => {
      state.status = !state.status;
    },
    changePriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { statusToggled, changePriceRange } = products.actions;

export default products.reducer;
