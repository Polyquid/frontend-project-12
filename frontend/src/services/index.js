import { configureStore } from '@reduxjs/toolkit';
import { messagesApi } from './messagesApi';
import { channelsApi } from './channelsApi';
import authSlice from './authSlice';
import uiSlice from './uiSlice';

export default configureStore({
  reducer: {
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    auth: authSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(messagesApi.middleware)
    .concat(channelsApi.middleware),
});
