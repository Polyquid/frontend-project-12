import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/signup',
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
