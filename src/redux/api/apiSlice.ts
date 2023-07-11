import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/products',
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = apiSlice;

export default apiSlice;
