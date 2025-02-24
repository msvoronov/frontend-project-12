import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (builder) => ({
    getMessages: builder.mutation({
      query: (token) => ({
        url: apiRoutes.messagesPath,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ token, message }) => ({
        url: apiRoutes.messagesPath,
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const { useGetMessagesMutation, useSendMessageMutation } = messagesApi;
