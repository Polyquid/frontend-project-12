import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getSocket from '../utils/getSocket';

const socket = getSocket();

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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        socket.connect();
        try {
          await cacheDataLoaded;
          const listener = (data) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          socket.on('newMessage', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.disconnect();
      },
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
