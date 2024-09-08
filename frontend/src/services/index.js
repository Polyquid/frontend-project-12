import { configureStore } from '@reduxjs/toolkit';
import { messagesApi } from './messagesApi';
import { channelsApi } from './channelsApi';
import uiSlice from './uiSlice';
import { authApi } from './authApi';
import { signupApi } from './signupApi';

export default configureStore({
  reducer: {
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(messagesApi.middleware)
    .concat(channelsApi.middleware)
    .concat(authApi.middleware)
    .concat(signupApi.middleware),
});
