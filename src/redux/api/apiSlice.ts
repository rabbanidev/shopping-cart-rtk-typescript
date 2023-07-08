import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const shoopingAppApi = createApi({
  reducerPath: 'shoppingCartAppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<>({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const { useGetProductsQuery } = shoopingAppApi;
