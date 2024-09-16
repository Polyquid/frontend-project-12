import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getLoginPath } from '../../constants/apiRouter';

const baseQuery = fetchBaseQuery({
  baseUrl: getLoginPath(),
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
