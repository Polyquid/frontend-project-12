import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/channels',
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

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery,
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;
