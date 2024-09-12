import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSignupPath } from '../constants/apiRouter';

const baseQuery = fetchBaseQuery({
  baseUrl: getSignupPath(),
});

export const signupApi = createApi({
  reducerPath: 'signup',
  baseQuery,
  endpoints: (builder) => ({
    postSignupData: builder.mutation({
      query: (data) => ({
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  usePostSignupDataMutation,
} = signupApi;
