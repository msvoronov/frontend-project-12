import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (builder) => ({
    getChannels: builder.mutation({
      query: (token) => ({
        url: apiRoutes.channelsPath,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    sendNewChannel: builder.mutation({
      query: ({ token, channel }) => ({
        url: apiRoutes.channelsPath,
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: channel,
      }),
    }),
    sendRenameChannel: builder.mutation({
      query: ({ token, channel }) => ({
        url: apiRoutes.channelPath(channel.id),
        headers: { Authorization: `Bearer ${token}` },
        method: 'PATCH',
        body: channel,
      }),
    }),
    sendRemoveChannel: builder.mutation({
      query: ({ token, id }) => ({
        url: apiRoutes.channelPath(id),
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsMutation,
  useSendNewChannelMutation,
  useSendRenameChannelMutation,
  useSendRemoveChannelMutation,
} = channelsApi;
