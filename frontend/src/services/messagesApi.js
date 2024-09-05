import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/messages',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }

    const localStorageToken = localStorage.getItem('token');
    headers.set('authorization', `Bearer ${localStorageToken}`);

    return headers;
  },
});

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
