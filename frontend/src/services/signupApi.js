import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiRouter from '../utils/apiRouter';

const baseQuery = fetchBaseQuery({
  baseUrl: apiRouter.getBaseSignup(),
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
