import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes.js';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (user) => ({
        url: apiRoutes.loginPath,
        method: 'POST',
        body: user,
      }),
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: apiRoutes.signupPath,
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useLogInMutation, useSignUpMutation } = authApi;
