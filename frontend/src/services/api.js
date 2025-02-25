import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // auth
    logIn: builder.mutation({
      query: (user) => ({
        url: apiRoutes.loginPath(),
        method: 'POST',
        body: user,
      }),
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: apiRoutes.signupPath(),
        method: 'POST',
        body: user,
      }),
    }),

    // channels
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
    }),
    sendNewChannel: builder.mutation({
      query: (channel) => ({
        url: apiRoutes.channelsPath(),
        method: 'POST',
        body: channel,
      }),
    }),
    sendRenameChannel: builder.mutation({
      query: (channel) => ({
        url: apiRoutes.channelPath(channel.id),
        method: 'PATCH',
        body: channel,
      }),
    }),
    sendRemoveChannel: builder.mutation({
      query: (id) => ({
        url: apiRoutes.channelPath(id),
        method: 'DELETE',
      }),
    }),

    // messages
    getMessages: builder.query({
      query: () => apiRoutes.messagesPath(),
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: apiRoutes.messagesPath(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

const {
  useLogInMutation,
  useSignUpMutation,
  useGetChannelsQuery,
  useSendNewChannelMutation,
  useSendRenameChannelMutation,
  useSendRemoveChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = api;

export {
  useLogInMutation as useLogIn,
  useSignUpMutation as useSignUp,
  useGetChannelsQuery as useGetChannels,
  useSendNewChannelMutation as useSendNewChannel,
  useSendRenameChannelMutation as useSendRenameChannel,
  useSendRemoveChannelMutation as useSendRemoveChannel,
  useGetMessagesQuery as useGetMessages,
  useSendMessageMutation as useSendMessage,
};
