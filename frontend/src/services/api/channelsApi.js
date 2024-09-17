import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getChannelPath } from '../../constants/apiRouter';

const baseQuery = fetchBaseQuery({
  baseUrl: getChannelPath(),
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().authData;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

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
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: id,
        method: 'PATCH',
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useEditChannelMutation,
} = channelsApi;
