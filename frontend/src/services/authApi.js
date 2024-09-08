import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/login',
});

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery,
  endpoints: (builder) => ({
    postAuthData: builder.mutation({
      query: (data) => ({
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  usePostAuthDataMutation,
} = authApi;
