import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getSocket from '../utils/getSocket';
import { setCurrentChannel } from './uiSlice';
import { getChannelPath } from '../constants/apiRouter';

const socket = getSocket();

const baseQuery = fetchBaseQuery({
  baseUrl: getChannelPath(),
  prepareHeaders: (headers) => {
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
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          dispatch,
          getState,
        },
      ) {
        socket.connect();
        try {
          await cacheDataLoaded;
          const listenerNewChannelEvent = (data) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          const listenerRemoveChannelEvent = ({ id: removedId }) => {
            updateCachedData((draft) => draft.filter(({ id }) => id !== removedId));
            const { ui: { currentChannel, clickedChannel, defaultChannel } } = getState();
            console.log(getState());
            if (currentChannel.id === clickedChannel.id) {
              dispatch(setCurrentChannel(defaultChannel));
            }
          };
          const listenerRenameChannelEvent = (data) => {
            updateCachedData((draft) => draft.map((channel) => {
              if (channel.id === data.id) {
                return data;
              }
              return channel;
            }));
          };
          socket.on('newChannel', listenerNewChannelEvent);
          socket.on('removeChannel', listenerRemoveChannelEvent);
          socket.on('renameChannel', listenerRenameChannelEvent);
        } catch {
          throw new Error();
        }
        await cacheEntryRemoved;
        socket.disconnect();
      },
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
