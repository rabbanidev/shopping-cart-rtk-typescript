import apiSlice from '@/redux/api/apiSlice';

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
      }),
      providesTags: ['comments'],
    }),
  }),
});

export const { usePostCommentMutation, useGetCommentQuery } = commentApi;
