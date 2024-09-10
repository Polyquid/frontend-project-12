import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiRouter from '../utils/apiRouter';

const baseQuery = fetchBaseQuery({
  baseUrl: apiRouter.getBaseLogin(),
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
