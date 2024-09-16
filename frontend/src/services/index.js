import { configureStore } from '@reduxjs/toolkit';
import { messagesApi } from './api/messagesApi';
import { channelsApi } from './api/channelsApi';
import { authApi } from './api/authApi';
import { signupApi } from './api/signupApi';
import uiSlice from './slices/uiSlice';
import authDataSlice from './slices/authDataSlice';

export default configureStore({
  reducer: {
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    ui: uiSlice,
    authData: authDataSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(messagesApi.middleware)
    .concat(channelsApi.middleware)
    .concat(authApi.middleware)
    .concat(signupApi.middleware),
});
