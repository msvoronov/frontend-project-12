import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi.js';
import authReducer from './authSlice.js';

import { channelsApi } from './channelsApi.js';
import channelsReducer from './channelsSlice.js';

import { messagesApi } from './messagesApi.js';
import messagesReducer from './messagesSlice.js';

import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,

    [channelsApi.reducerPath]: channelsApi.reducer,
    channels: channelsReducer,

    [messagesApi.reducerPath]: messagesApi.reducer,
    messages: messagesReducer,

    modal: modalReducer,
  },
});
