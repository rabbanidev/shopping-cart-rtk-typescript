import apiSlice from '@/redux/api/apiSlice';
import { IProduct } from '@/types/globalTypes';

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], undefined>({
      query: () => ({
        url: '/products',
      }),
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
